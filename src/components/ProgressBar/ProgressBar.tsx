import React, { useEffect, useState } from 'react';
import api from '../../api';
import './progressbar.scss'

type PropsType = {
    title: string;
}


let interval: NodeJS.Timer;
let secondInterval: NodeJS.Timer;
let timeout: NodeJS.Timeout;

export default function ProgressBar(props: PropsType) {
    const [dynamicWidth, setDynamicWidth] = useState(0);
    const [barIsVisible, setBarVisible] = useState(false);

    useEffect(() => {
        // setDynamicWidth((val) => {
        //     const newVal = val + 1;
        //     console.log('fff', val);
        //     if (newVal > 99) {
        //         clearInterval(interval);
        //     }
        //     return newVal;
        // });
        // console.log('progress bar use effect');
        // let interval: NodeJS.Timer;
        const progressInterceptor = api.interceptors.request.use((config) => {
            if (config.method !== 'get') return config;
            interval = setInterval(() => {
                setDynamicWidth((val) => {
                    const newVal = val + 1;
                    console.log('fff', val);
                    if (newVal > 99) {
                        clearInterval(interval);
                    }
                    return newVal;
                })
            });
            // console.log(config);
            return config;
        });



        return () => {
            api.interceptors.request.eject(progressInterceptor);
            // api.interceptors.response.eject(progressEndInterceptor);
            // clearInterval(interval);
            // clearInterval(secondInterval);
            // clearTimeout(timeout);
        }
    });

    useEffect(() => {
        const progressEndInterceptor = api.interceptors.response.use((res) => {
            if ('accessToken' in res) return res;
            // console.log(dynamicWidth);

            const promise = new Promise((resolve) => {
                timeout = setTimeout(() => {
                    // clearInterval(interval);
                    console.log(dynamicWidth);
                    if (dynamicWidth > 99) {
                        clearInterval(interval);
                        clearInterval(secondInterval);
                        clearTimeout(timeout);

                    }
                    resolve(res);
                    // secondInterval = setInterval(() => {

                    //     setDynamicWidth((val) => {
                    //         const newVal = val + 1;

                    //         if (newVal > 99) {


                    //             clearInterval(secondInterval);
                    //             clearTimeout(timeout);
                    //         }
                    //         return newVal;
                    //     });
                    // });


                }, 10000000);
            });
            promise.then(res => {
                clearInterval(interval);
                clearInterval(secondInterval);
                clearTimeout(timeout);
                return res;
            });
            // timeout = setTimeout(() => {
            //     // clearInterval(interval);
            //     console.log(dynamicWidth);
            //     if (dynamicWidth > 99) {
            //         clearInterval(interval);
            //         clearInterval(secondInterval);
            //         clearTimeout(timeout);

            //     }
            //     // secondInterval = setInterval(() => {

            //     //     setDynamicWidth((val) => {
            //     //         const newVal = val + 1;

            //     //         if (newVal > 99) {


            //     //             clearInterval(secondInterval);
            //     //             clearTimeout(timeout);
            //     //         }
            //     //         return newVal;
            //     //     });
            //     // });

            //     return res;
            // }, 10000000);

            // clearTimeout(timeout);
            // return res;
        });
        return () => {
            // api.interceptors.request.eject(progressInterceptor);
            api.interceptors.response.eject(progressEndInterceptor);
            // clearInterval(interval);
            // clearInterval(secondInterval);
            // clearTimeout(timeout);
        }
    }, []);


    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__outer">
            <div className="progress-bar__inner" style={{ 'width': dynamicWidth + '%' }}></div>
        </div>
    </div>);
}