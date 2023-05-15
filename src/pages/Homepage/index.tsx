import React from 'react';
import styles from './Homepage.module.scss';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <img src="/img/homepage.gif" alt="marvel" className={styles.img}/>
        </div>
    );
}
