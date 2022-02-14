import * as React from 'react';
import './loader.css';

const Loader = ({color = "text-blue-500" }) => {
    return (
        <svg className="spinner spinner-md" viewBox="0 0 50 50">
            <circle className={"path stroke-current " + color} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
    );
}

const LoaderLg = ({color = "text-blue-500"}) => {
    return (
        <svg className="spinner spinner-lg" viewBox="0 0 50 50">
            <circle className={"path stroke-current " + color} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
    );
}

const LoaderSm = ({color = "text-blue-500"}) => {
    return (
        <svg className="spinner spinner-sm" viewBox="0 0 30 30">
            <circle className={"path stroke-current " + color} cx="15" cy="15" r="10" fill="none" strokeWidth="5"></circle>
        </svg>
    );
}

export {LoaderSm, Loader, LoaderLg };