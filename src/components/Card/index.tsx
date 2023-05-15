import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hook/useAppSelector';
import styles from './Card.module.scss';
import {
  addBookmark,
  deleteBookmark,
} from '../../redux/reducers/bookmark/actions';
import { getIfExist } from '../../redux/reducers/bookmark/selectors';
import { addHiddenItem } from '../../redux/reducers/hiddenItems/actions';

interface IInfo {
  img: string;
  title: string;
  id: number;
}
interface IProps {
  page: string;
  info: IInfo;
}

export default function Card({ page, info }: IProps) {
  const { img, title, id } = info;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isBookMarked = useAppSelector((state) =>
    getIfExist(info.id, state.bookMarks)
  );
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate('/' + page + '/' + id);
      }}
    >
      <div
        style={{
          backgroundImage: `url(${img}/portrait_fantastic.jpg)`,
        }}
        className={styles.container__image}
      ></div>
      <div className={styles.container__info}>
        <h1>{title}</h1>

        <div className={styles.buttons}>
          <button
            className={styles.container__hide}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addHiddenItem({ id, type: page }));
            }}
          >
            <i className='fa-solid fa-eye-slash'></i>
          </button>

          <button
            data-testid='bookmark'
            className={`${styles.container__bookMark} ${
              isBookMarked ? styles['container__bookMark--delete'] : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isBookMarked) {
                dispatch(addBookmark({ ...info, page: page }));
              } else {
                dispatch(deleteBookmark({ ...info, page: page }));
              }
            }}
          >
            {!isBookMarked ? (
              <i className='fa-solid fa-bookmark' />
            ) : (
              <i className='fa-solid fa-trash' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
