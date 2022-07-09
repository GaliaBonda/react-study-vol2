import React from 'react';

type PropsType = {
    title: string;
}

export default function ProgressBar(props: PropsType) {
    return (<div className="progress-bar">
        <h2 className="progress-bar__title">{props.title}</h2>
        <div className="progress-bar__inner"></div>
    </div>);
}