import React from 'react';
import styles from './MainLayout.module.scss';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
