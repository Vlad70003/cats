import React from 'react';
import {CenterWrapperInterfaces} from "./interfaces";

function CenterWrapper({children, size} : CenterWrapperInterfaces) {
    return (
        <div className="flex justify-center">
            <div style={{width: size}} >
                {children}
            </div>
        </div>
    );
}

export default CenterWrapper;