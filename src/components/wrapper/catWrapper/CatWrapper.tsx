import React from 'react';
import {CenterWrapperInterfaces} from "./interfaces";
import classNames from "classnames";

function CatWrapper({
                        children,
                        size,
                        margin = '0px',
                        centerWidth = true,
                        centerHeight = false,
                        fullHeight = true,
                    }: CenterWrapperInterfaces) {

    const wrapperClasses = classNames({
        flex: true,
        'justify-center': centerWidth,
        'fullHeight': fullHeight,
        'items-center': centerHeight,
    })

    return (
        <div className={wrapperClasses}>
            <div style={{width: size, margin: margin}}>
                {children}
            </div>
        </div>
    );
}

export default CatWrapper;