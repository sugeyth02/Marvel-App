import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAllHidden } from '../../redux/reducers/hiddenItems/actions';
import styles from './NavBar.module.scss';

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.header__link} to='/'>
          <img
            src='/img/Marvel_Logo.svg.png'
            alt='Marvel logo'
            className={styles.header_img}
          />
        </Link>
        <div className={styles.buttons}>
          <button
            className={styles.button__hidden}
            onClick={(e) => {
              dispatch(deleteAllHidden());
            }}
          >
            <i className='fa-solid fa-eye'></i>
          </button>
          <Link to='/bookmark'>
            <i className='fa-solid fa-bookmark'></i>
          </Link>
        </div>
      </div>
      <ul className={styles.pages}>
        <li className={styles.pages__link}>
          <Link to='/characters'>CHARACTERS</Link>
        </li>
        <li className={styles.pages__link}>
          <Link to='/comics'>COMICS</Link>
        </li>
        <li className={styles.pages__link}>
          <Link to='/stories'>STORIES</Link>
        </li>
      </ul>
    </div>
  );
}
