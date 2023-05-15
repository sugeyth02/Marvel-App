import React from 'react';
import Card from '../../components/Card';
import { useAppSelector } from '../../hook/useAppSelector';
import { useDispatch } from 'react-redux';
import styles from './BookMark.module.scss';
import { deleteAllBookmarks } from '../../redux/reducers/bookmark/actions';

export default function BookMarks() {
  const { list } = useAppSelector((state) => state.bookMarks);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <h1>Bookmarks</h1>
      <button className={styles.container__delete} onClick={() => {
        dispatch(deleteAllBookmarks());
      }}>
        Delete all
      </button>
      <div className={styles.container__cards}>
        {list.map((item) => (
          <Card info={item} key={item.id} page={item.page} />
        ))}
      </div>
    </div>
  );
}
