import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import { debounce } from '../../utilities/debounce';

export default function SearchBar() {
  const search = useSearchParams();


  const handleName = useCallback(
    (value: string) => {
      if (value.trim() !== '') {
        search[1]({
          page: '1',
          name: `${value}`,
        });
      }
    },
    [search]
  );
  return (
    <div className={styles.searchBar}>
      <button className={styles.searchBar_button}>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>
      <label htmlFor='search' className={styles.searchBar__label}>
        search
      </label>
      <input
        className={styles.searchBar__input}
        name='search'
        type='text'
        placeholder='SEARCH'
        onChange={(e) => {
          const handleDebounce = debounce((value: string) => { handleName(value); }, 300);
          handleDebounce(e.target.value);
        }}
      />
    </div>
  );
}
