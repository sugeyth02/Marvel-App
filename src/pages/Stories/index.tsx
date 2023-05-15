import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from '../../components/Item';
import Pagination from '../../components/Pagination';
import { ICharacter } from '../../entities/ICharacter';
import { IStorie } from '../../entities/IStorie';
import services from '../../services/service';
import styles from './Stories.module.scss';

export default function Stories() {
  const [page, setPage] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [stories, setStories] = useState<IStorie[]>([]);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [search, setSearch] = useSearchParams();
  const [pageQuery, characterQuery] = [
    search.get('page'),
    search.get('character'),
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getStories({
          limit: 30,
          ...(pageQuery !== null && {
            offset: `${(Number(pageQuery) - 1) * 30}`,
          }),
          ...(characterQuery !== null && { characters: `${characterQuery}` }),
        });
        setStories(response.result);
        setCountItems(response.count);
      } catch (err) {}
    };
    getData();
  }, [characterQuery, pageQuery]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getCharacters({ limit: 100 });
        setCharacters(response.result);
      } catch (err) {}
    };
    getData();
  }, []);

  const handleCharacterSelected = useCallback(
    (value: string) => {
      setSearch({
        page: '1',
        character: `${value}`,
      });
    },
    [setSearch]
  );

  useEffect(() => {
    setPage(1);
  }, [characterQuery, setPage]);
  
  useEffect(() => {
    setSearch({
      page: `${page}`,
      ...(characterQuery !== null && { character: characterQuery }),
    });
  }, [page, characterQuery, setSearch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__header}>MARVEL STORIES LIST</h1>
      <div className={styles.container__filters}>
        <div className={styles.filters__select}>
          <label htmlFor='characters'>Characters:</label>
          <select
            name='characters'
            id='characters'
            onChange={(e) => {
              handleCharacterSelected(e.target.value);
            }}
          >
            {characters.map((character) => (
              <option value={character.id} key={character.id}>
                {character.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.container__items}>
        {stories.map((story) => (
          <Item
            page='stories'
            title={story.title}
            id={story.id}
            key={story.id}
          />
        ))}
      </div>
      <Pagination
        setPage={setPage}
        currentPage={page}
        totalItems={countItems}
        itemsperPage={30}
      />
    </div>
  );
}
