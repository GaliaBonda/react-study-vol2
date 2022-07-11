import React, { useEffect, useState } from 'react';
import './progressbar.scss'

type PropsType = {
    title: string;
    active: boolean;
}



export default function ProgressBar(props: PropsType) {
    const [dynamicWidth, setDynamicWidth] = useState(0);
    const [barIsVisible, setBarVisible] = useState(false);

    
    
    useEffect(() => {
        
        const interval = setInterval(() => {
            setDynamicWidth((val) => {
                let newVal = val + 1;
                if (newVal > 99) clearInterval(interval);
                return newVal;
            });
        }, 20);
    }, []);

    useEffect(() => {
        if (props.active && dynamicWidth <= 100) {
            setBarVisible(true);
        } else {
            setBarVisible(false);
        }
    });

    // if (!barIsVisible) return null;
    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__outer">
            <div className="progress-bar__inner" style={{'width': dynamicWidth + '%'}}></div>
        </div>
    </div>);
}