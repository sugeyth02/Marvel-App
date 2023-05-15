import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../../components/Card';
import { ICharacter } from '../../entities/ICharacter';
import { useAppSelector } from '../../hook/useAppSelector';
import { IComic } from '../../entities/IComic';
import { IStorie } from '../../entities/IStorie';
import services from '../../services/service';
import styles from './Characters.module.scss';
import { getCharacters } from '../../redux/reducers/hiddenItems/selectors';
import Pagination from '../../components/Pagination';
export default function Characters() {
  const [page, setPage] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [comics, setComics] = useState<IComic[]>([]);
  const [stories, setStories] = useState<IStorie[]>([]);
  const [search, setSearch] = useSearchParams();
  const [pageQuery, nameQuery, comicsQuery, storiesQuery] = [
    search.get('page'),
    search.get('name'),
    search.get('comics'),
    search.get('stories'),
  ];

  const hiddenCharacters = useAppSelector((state) =>
    getCharacters(state.hiddenItems)
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getCharacters({
          limit: 24,
          ...(pageQuery !== null && {
            offset: `${(Number(pageQuery) - 1) * 24}`,
          }),
          ...(nameQuery !== null && { nameStartsWith: `${nameQuery}` }),
          ...(storiesQuery !== null && { stories: storiesQuery }),
          ...(comicsQuery !== null && { comics: comicsQuery }),
        });
        setCharacters(response.result);
        setCountItems(response.count);
      } catch (err) {}
    };
    getData();
  }, [nameQuery, storiesQuery, comicsQuery, pageQuery, page]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getStories({
          limit: 30,
          offset: '399',
        });
        setStories(response.result);
      } catch (err) {}
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getComics({
          limit: 100,
          offset: '21365',
        });
        setComics(response.result);
      } catch (err) {}
    };
    getData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [nameQuery, comicsQuery, storiesQuery, setPage]);

  const handleComicSelected = useCallback(
    (id: string) => {
      if (storiesQuery) {
        setSearch({
          page: '1',
          comics: `${id}`,
          stories: `${storiesQuery}`,
        });
      } else {
        setSearch({
          page: '1',
          comics: `${id}`,
        });
      }
    },
    [storiesQuery, setSearch]
  );

  const handleStorieSelected = useCallback(
    (id: string) => {
      if (comicsQuery) {
        setSearch({
          page: '1',
          comics: `${comicsQuery}`,
          stories: `${id}`,
        });
      } else {
        setSearch({
          page: '1',
          stories: `${id}`,
        });
      }
    },
    [comicsQuery, setSearch]
  );

  useEffect(() => {
    setSearch({
      page: `${page}`,
      ...(nameQuery !== null && { name: `${nameQuery}` }),
      ...(storiesQuery !== null && { stories: storiesQuery }),
      ...(comicsQuery !== null && { comics: comicsQuery }),
    });
  }, [page, nameQuery, storiesQuery, comicsQuery, setSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.container__filters}>
        <div className={styles.filters__select}>
          <label htmlFor='comics'>Comics:</label>
          <select
            name='comics'
            id='comics'
            onChange={(e) => {
              handleComicSelected(e.target.value);
            }}
          >
            {comics.map((comics) => (
              <option value={comics.id} key={comics.id}>
                {comics.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filters__select}>
          <label htmlFor='stories'>Stories:</label>
          <select
            name='stories'
            id='stories'
            onChange={(e) => {
              handleStorieSelected(e.target.value);
            }}
          >
            {stories.map((story) => (
              <option value={story.id} key={story.id}>
                {story.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.container__cards}>
        {characters
          .filter(
            (nohidden) =>
              !hiddenCharacters.some((hidden) => hidden.id === nohidden.id)
          )
          .map((character) => (
            <Card
              key={character.id}
              page='characters'
              info={{
                img: character.thumbnail.path,
                title: character.name,
                id: character.id,
              }}
            />
          ))}
      </div>
      <Pagination
        setPage={setPage}
        currentPage={page}
        totalItems={countItems}
        itemsperPage={24}
      />
    </div>
  );
}
