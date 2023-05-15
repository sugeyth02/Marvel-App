import styles from './ImageCard.module.scss';

import React from 'react';

interface IProps {
  img: string;
}
export default function ImageCard({ img }: IProps) {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${img}/portrait_uncanny.jpg)`,
      }}
    ></div>
  );
}
