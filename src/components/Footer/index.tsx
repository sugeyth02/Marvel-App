import React from 'react';
import styles from './Footer.module.scss';


export default function Footer() {
  return (
    <div className={styles.container}>
      <img
        src='/img/m_logo.png'
        alt='Marvel logo'
        className={styles.container__img}
      />
      <p className={styles.container__reserved}>
        Data provided by Marvel. © 2014 Marvel
      </p>
      <div className={styles.container__info}>
        <a
          className={styles.info__link}
          href='https://help.marvel.com/hc/en-us'
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
