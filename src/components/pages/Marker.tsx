import React from 'react';
import './Marker.css';

const Marker = (props: any) => {
    const { color, name } = props;
    return (
        <div onClick={props.onClick}>
            <div
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={name}
            />
            <div className="pulse" />
        </div>
    );
};

export default Marker;