import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import store from '../../store/store';
import './progressbar.scss'

type PropsType = {
    title: string;
    active: boolean;
}



export default function ProgressBar(props: PropsType) {
    const [dynamicWidth, setDynamicWidth] = useState(0);
    const [barIsVisible, setBarVisible] = useState(false);
    

    
    
  useEffect(() => {
   
    
        api.interceptors.request.use((config) => {
            
            // setDynamicWidth(0);
            
    if (config.url?.includes('login')) {
        return config;
        }
        store.dispatch({type: 'PROGRESS_BAR_ON'});
        const interval = setInterval(() => {
            console.log(interval);
            
            setDynamicWidth((val) => {
                let newVal = val + 1;
                
                if (newVal > 99 || !props.active) {
                    clearInterval(interval);
                }
                return newVal;
            });
        }, 20);
        
        
        return config;
    });

    api.interceptors.response.use((res) => {
        console.log(res);
        
        if ('accessToken' in res) return res;
        
        
      const interval = setInterval(() => {
            setDynamicWidth((val) => {
                let newVal = val + 1;
                
                if (newVal > 99) {
                    clearInterval(interval);
                }
                return newVal;
            });
        }, 1);
    if (dynamicWidth <= 100) {
        return new Promise(resolve => {
            setTimeout(() => {
                store.dispatch({ type: 'PROGRESS_BAR_OFF' });
                return resolve(res);
            }, 100 - dynamicWidth + 500);
        });
    }
    store.dispatch({ type: 'PROGRESS_BAR_OFF' });
    return res;
    });
    
   },
   []);


    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__outer">
            <div className="progress-bar__inner" style={{'width': dynamicWidth + '%'}}></div>
        </div>
    </div>);
}