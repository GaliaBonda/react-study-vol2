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
        // console.log('progress bar use effect');
        let interval: NodeJS.Timer;
        const progressInterceptor = api.interceptors.request.use((config) => {
            if (config.method !== 'get') return config;
            interval = setInterval(() => {
                setDynamicWidth((val) => {
                    const newVal = val + 1;
                    if (newVal > 99) {
                        clearInterval(interval);
                    }
                    return newVal;
                })
            });
            // console.log(config);
            return config;
        });
        let secondInterval: NodeJS.Timer;
        let timeout: NodeJS.Timeout;
        const progressEndInterceptor = api.interceptors.response.use((res) => {
            if ('accessToken' in res) return res;
            timeout = setTimeout(() => {
                secondInterval = setInterval(() => {
                    setDynamicWidth((val) => {
                        const newVal = val + 1;
                        if (newVal > 99) {
                            clearInterval(secondInterval);
                            clearTimeout(timeout);
                        }
                        return newVal;
                    });
                });
            }, 1000000);
            // clearTimeout(timeout);
            return res;
        });

        return () => {
            api.interceptors.request.eject(progressInterceptor);
            api.interceptors.request.eject(progressEndInterceptor);
            // clearInterval(interval);
            // clearInterval(secondInterval);
            clearTimeout(timeout);
        }
    }, []);


    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__outer">
            <div className="progress-bar__inner" style={{ 'width': dynamicWidth + '%' }}></div>
        </div>
    </div>);
}