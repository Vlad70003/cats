import React from 'react';
import styles from './BaseHeading.module.scss';

function BaseHeading() {
    return (
        <div className={`${styles.baseHeading} flex items-center`}>
            <div className={`${styles.title} kreon-bold-400`}>
                CAT
            </div>
            <div className={styles.desc}>
                currencies<br/> academic<br/> terms
            </div>
        </div>
    );
}

export default BaseHeading;