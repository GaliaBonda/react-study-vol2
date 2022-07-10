import React, { useEffect, useState } from 'react';
import './progressbar.scss'

type PropsType = {
    title: string;
}



export default function ProgressBar(props: PropsType) {
    const [dynamicWidth, setDynamicWidth] = useState('5%');
    useEffect(() => {

    });

    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__outer">
            <div className="progress-bar__inner" style={{'width': dynamicWidth}}></div>
        </div>
    </div>);
}