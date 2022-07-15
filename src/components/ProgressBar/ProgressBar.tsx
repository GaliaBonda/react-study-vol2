import React, { useEffect, useState } from 'react';
import api from '../../api';
import './progressbar.scss'

type PropsType = {
    title: string;
}



export default function ProgressBar(props: PropsType) {
    const [dynamicWidth, setDynamicWidth] = useState(0);
    const [barIsVisible, setBarVisible] = useState(false);




    useEffect(() => {
        console.log('progress bar use effect');
        
        api.interceptors.request.use((config) => {
            if (config.method !== 'get') return config;
            console.log('Progress bar interceptor');
            console.log(config);
            return config;
            
            // if (config.url?.includes('login')) {
            //     return config;
            // }
            
            // const interval = setInterval(() => {
            //     console.log(interval);
            //     setDynamicWidth((val) => {
            //         let newVal = val + 1;
            //         if (newVal > 99 || !props.active) {
            //             clearInterval(interval);
            //         }
            //         return newVal;
            //     });
            // }, 20);
        });

        // api.interceptors.response.use((res) => {
        //     console.log(res);
        //     if ('accessToken' in res) return res;
        //     const interval = setInterval(() => {
        //         setDynamicWidth((val) => {
        //             let newVal = val + 1;
        //             if (newVal > 99) {
        //                 clearInterval(interval);
        //             }
        //             return newVal;
        //         });
        //     }, 1);
        //     if (dynamicWidth <= 100) {
        //         return new Promise(resolve => {
        //             setTimeout(() => {
        //                 store.dispatch({ type: 'PROGRESS_BAR_OFF' });
        //                 return resolve(res);
        //             }, 100 - dynamicWidth + 500);
        //         });
        //     }
        //     store.dispatch({ type: 'PROGRESS_BAR_OFF' });
        //     return res;
        // });

    }, []);


    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__outer">
            <div className="progress-bar__inner" style={{ 'width': dynamicWidth + '%' }}></div>
        </div>
    </div>);
}