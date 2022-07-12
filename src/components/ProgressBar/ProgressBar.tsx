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
    if (!config.url?.includes('login')) {
        store.dispatch({type: 'PROGRESS_BAR_ON'});
        }
        const interval = setInterval(() => {
            setDynamicWidth((val) => {
                let newVal = val + 1;
                console.log('request');
                
                if (newVal > 99) {
                    clearInterval(interval);
                }
                return newVal;
            });
        }, 50);
        
        return config;
    });

    // api.interceptors.response.use((res) => {
        
    //       console.log('lll');
    //       store.dispatch({ type: 'PROGRESS_BAR_OFF' });
    //       return new Promise(resolve =>
    //         setTimeout(() => resolve(res), 6000));
        
    //   })}, []);

    api.interceptors.response.use((res) => {
        // console.log('response');
        // return new Promise(resolve =>
        //     setTimeout(() => resolve(res), 6000))
        // });
      
    if (dynamicWidth <= 100) {
        return new Promise(resolve => {
            let timeout = setTimeout(() => {
        //     const interval = setInterval(() => {
        //     setDynamicWidth((val) => {
        //         let newVal = val + 1;
        //         if (newVal > 99) {
        //             clearInterval(interval);
        //         }
        //         return newVal;
        //     });
        // }, 20);
        if (dynamicWidth > 99) {
            clearTimeout(timeout);
        }
        return resolve(res);
    }, 5000);
        
        });
        
    
    }
    store.dispatch({ type: 'PROGRESS_BAR_OFF' });
    
    return res;
    }); 
   }, []);

//    useEffect(() => {
//         const interval = setInterval(() => {
//             setDynamicWidth((val) => {
//                 let newVal = val + 1;
//                 if (newVal > 99) {
//                     clearInterval(interval);
//                 }
//                 return newVal;
//             });
//         }, 50);
//    });

    // useEffect(() => {
    //     if (props.active && dynamicWidth <= 100) {
    //         setBarVisible(true);
    //     } else {
    //         setBarVisible(false);
    //     }
    // });

    // if (!barIsVisible) return null;
    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__outer">
            <div className="progress-bar__inner" style={{'width': dynamicWidth + '%'}}></div>
        </div>
    </div>);
}