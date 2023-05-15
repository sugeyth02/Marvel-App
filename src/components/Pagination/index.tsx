import { usePagination, EllipseArrow } from '../../hook/usePagination';
import styles from './Pagination.module.scss';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalItems: number;
  itemsperPage: number;
}
export default function Pagination({
  setPage,
  currentPage,
  totalItems,
  itemsperPage,
}: Props) {
  const { backward, getBlocksToRender, forward,pageCount } = usePagination({
    setPage,
    currentPage,
    totalItems,
    itemsperPage,
  });
  return (
    <div className={styles.container}>
      <button
        className={styles.container__button}
        onClick={backward}
        disabled={currentPage === 1 ? true : false}
      >
        <i className='fa-solid fa-angle-left'></i>
      </button>
      <div className={styles.numbers}>
        {getBlocksToRender.map((value, index) => {
          if (value === EllipseArrow.LEFT || value === EllipseArrow.RIGHT) {
            return <span key={`${value}-paging-button-${index}`}>...</span>;
          }
          return (
            <button
              key={`${value}-paging-button-${index}`}
              className={`${styles.container__button} ${
                currentPage === value ? styles.currentPage : ''
              }`}
              onClick={() => setPage(value)}
            >
              {value}
            </button>
          );
        })}
      </div>
      <button
        className={styles.container__button}
        onClick={forward}
        disabled={currentPage === pageCount ? true : false}
      >
        <i className='fa-solid fa-angle-right'></i>
      </button>
    </div>
  );
}
