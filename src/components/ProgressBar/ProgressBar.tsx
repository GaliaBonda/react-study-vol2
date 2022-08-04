import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import './progressbar.scss'

interface Props {
    title: string,
    progress: { shown: boolean },
}

interface State {
    progress: { shown: boolean },
};


let interval: NodeJS.Timer;
let secondInterval: NodeJS.Timer;
let timeout: NodeJS.Timeout;

function ProgressBar(props: Props) {
    const [dynamicWidth, setDynamicWidth] = useState(0);
    // const [barIsVisible, setBarVisible] = useState(false);

    useEffect(() => {
        // console.log(props.progress);

        if (dynamicWidth < 100) {
            setDynamicWidth((val) => (val + 2));
        }
    }, [dynamicWidth]);

    // useEffect(() => {

    //     const progressInterceptor = api.interceptors.request.use((config) => {
    //         if (config.method !== 'get') return config;
    //         interval = setInterval(() => {
    //             setDynamicWidth((val) => {
    //                 const newVal = val + 1;
    //                 console.log('fff', val);
    //                 if (newVal > 99) {
    //                     clearInterval(interval);
    //                 }
    //                 return newVal;
    //             })
    //         });
    //         // console.log(config);
    //         return config;
    //     });



    //     return () => {
    //         api.interceptors.request.eject(progressInterceptor);
    //         // api.interceptors.response.eject(progressEndInterceptor);
    //         // clearInterval(interval);
    //         // clearInterval(secondInterval);
    //         // clearTimeout(timeout);
    //     }
    // }, []);

    // useEffect(() => {
    //     const progressEndInterceptor = api.interceptors.response.use((res) => {
    //         if ('accessToken' in res) return res;
    //         // console.log(dynamicWidth);
    //         if (dynamicWidth > 99) {

    //             clearInterval(interval);

    //             // clearTimeout(timeout);
    //             console.log(res);

    //             return res;
    //         } else {
    //             timeout = setTimeout(() => {

    //                 console.log(dynamicWidth);



    //                 return res;


    //             }, 1);
    //         }
    //         const promise = new Promise((resolve) => {
    //             if (dynamicWidth > 99) {

    //                 clearInterval(interval);

    //                 // clearTimeout(timeout);
    //                 console.log(res);

    //                 resolve(res);
    //             } else {
    //                 timeout = setTimeout(() => {

    //                     console.log(dynamicWidth);



    //                     resolve(res);


    //                 }, 10000000);
    //             }

    //         });
    //         promise.then(res => {
    //             clearInterval(interval);
    //             clearInterval(secondInterval);
    //             clearTimeout(timeout);
    //             return res;
    //         });

    //     });
    //     return () => {
    //         // api.interceptors.request.eject(progressInterceptor);
    //         api.interceptors.response.eject(progressEndInterceptor);
    //         // clearInterval(interval);
    //         // clearInterval(secondInterval);
    //         // clearTimeout(timeout);
    //     }
    // }, []);


    return (<>
        {props.progress.shown ? (<div className="progress-bar">
            <h2 className="progress-bar__title">{props.title}</h2>
            <div className="progress-bar__outer">
                <div className="progress-bar__inner" style={{ 'width': dynamicWidth + '%' }}></div>
            </div>
        </div>) : null}

    </>);
}

const mapStateToProps = (state: State) => {
    return { progress: { ...state.progress } }
};



export default connect(mapStateToProps)(ProgressBar);