import * as React from 'react';
import 'styled-components-react-native';
import './slidein.css';

const Alertbar = ({slide = "out"}) => {
    
    return (
        <div className={`slide slide${slide} px-auto p-3`}>
            <div className="mx-auto p-5 rounded-md bg-gray-900 hover:bg-gray-700 transition-all">
                Careful -- You have unsaved changes!
            </div>
        </div>
    );
}

export { Alertbar };