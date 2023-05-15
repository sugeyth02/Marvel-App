import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import { IComic } from '../../entities/IComic';
import { useAppSelector } from '../../hook/useAppSelector';
import { getComics } from '../../redux/reducers/hiddenItems/selectors';
import services from '../../services/service';
import styles from './Comics.module.scss';

export default function Comics() {
  const [page, setPage] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [comics, setComics] = useState<IComic[]>([]);
  const [search, setSearch] = useSearchParams();
  const [pageQuery, nameQuery, formatQuery] = [
    search.get('page'),
    search.get('name'),
    search.get('format'),
  ];
  const hiddenComics = useAppSelector((state) => getComics(state.hiddenItems));
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getComics({
          limit: 24,
          ...(pageQuery !== null && {
            offset: `${(Number(pageQuery) - 1) * 24}`,
          }),
          ...(nameQuery !== null && { titleStartsWith: `${nameQuery}` }),
          ...(formatQuery !== null && { format: formatQuery }),
        });
        setComics(response.result);
        setCountItems(response.count);
      } catch (err) {}
    };
    getData();
  }, [nameQuery, formatQuery, pageQuery]);

  const handleFormatSelected = useCallback(
    (value: string) => {
      setSearch({
        page: '1',
        format: `${value}`,
      });
    },
    [setSearch]
  );

  useEffect(() => {
    setPage(1);
  }, [nameQuery, formatQuery, setPage]);

  useEffect(() => {
    setSearch({
      page: `${page}`,
      ...(nameQuery !== null && { name: `${nameQuery}` }),
      ...(formatQuery !== null && { format: formatQuery }),
    });
  }, [page, nameQuery, formatQuery, setSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.container__filters}>
        <div className={styles.filters__select}>
          <label htmlFor='format'>Format:</label>
          <select
            name='format'
            id='format'
            onChange={(e) => {
              handleFormatSelected(e.target.value);
            }}
          >
            <option value='comic'>Comic</option>
            <option value='magazine'>Magazine</option>
            <option value='trade paperback'>Trade paperback</option>
            <option value='hardcover'>Hardcover</option>
            <option value='digest'>Digest</option>
            <option value='graphic novel'>Graphic novel</option>
            <option value='digital comic'>Digital comic</option>
            <option value='infinite comic'>Infinite comic</option>
          </select>
        </div>
      </div>
      <div className={styles.container__cards}>
        {comics
          .filter(
            (nohidden) =>
              !hiddenComics.some((hidden) => hidden.id === nohidden.id)
          )
          .map((comic) => (
            <Card
              key={comic.id}
              page='comics'
              info={{
                img: comic.thumbnail.path,
                title: comic.title,
                id: comic.id,
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
