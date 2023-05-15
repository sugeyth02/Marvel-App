import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import styles from './MasterPages.module.scss';

export default function MasterPages() {
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <h1 className={styles.container__header}>
        {pathname === '/characters'
          ? 'MARVEL CHARACTERS LIST'
          : 'MARVEL COMICS LIST'}
      </h1>
      <SearchBar />
      <Outlet />
    </div>
  );
}
