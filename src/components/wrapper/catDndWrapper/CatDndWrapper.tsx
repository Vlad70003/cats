import React, {useRef, useState} from 'react';
import {CatDndWrapperInterfaces} from "./interfaces";

function CatDndWrapper({startHeight = "auto", dnd = false, children } : CatDndWrapperInterfaces) {
    const footerRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [initialY, setInitialY] = useState(0);
    const [initialHeight, setInitialHeight] = useState(100);
    const cursor = dnd ? 'row-resize' : undefined;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (dnd) {
            setIsResizing(true);
            setInitialY(event.clientY);
            setInitialHeight(footerRef?.current?.clientHeight || 0);
        }
    };

    const handleMouseUp = () => {
        if (dnd) {
            setIsResizing(false);
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isResizing && dnd) {
            const deltaY = event.clientY - initialY;
            const newHeight = initialHeight - deltaY;
            footerRef.current!.style!.height = `${newHeight}px`;
        }
    };

    return (
        <div
            style={{
                position: 'relative',

            }}
        >
            <div
                ref={footerRef}
                style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: startHeight,
                    backgroundColor: '#000000',
                    cursor: cursor,
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {children}
            </div>
        </div>
    );
}

export default CatDndWrapper;