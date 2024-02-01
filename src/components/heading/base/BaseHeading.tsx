import React from 'react';
import './BaseHeading.scss';

function BaseHeading() {
    return (
        <div className="flex items-center base-heading">
            <div className="base-heading__title">
                CAT
            </div>
            <div className="base-heading__desc">
                currencies<br/> academic<br/> terms
            </div>
        </div>
    );
}

export default BaseHeading;