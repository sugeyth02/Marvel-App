import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Item.module.scss';

interface IProps {
  page: string;
  title: string;
  id: number;
}

export default function Item({ page, title, id }: IProps) {
  const navigate = useNavigate();
  return (
    <li
      className={styles.item}
      onClick={() => {
        navigate('/' + page + '/' + id);
      }}
    >
      {title}
    </li>
  );
}
