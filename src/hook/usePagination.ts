import { useCallback, useMemo } from 'react';
import { range } from '../utilities/range';

const enum EllipseArrow {
  'LEFT' = 100000,
  'RIGHT' = -10000,
}
const pageNeighbours = 2;

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalItems: number;
  itemsperPage: number;
}

function usePagination({
  setPage,
  currentPage,
  totalItems,
  itemsperPage,
}: Props) {


  const pageCount = useMemo(() => {
    return Math.ceil(totalItems / itemsperPage);
  }, [totalItems, itemsperPage]);


  const getBlocksToRender = useMemo(() => {
    const totalNumbers = pageNeighbours! * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (pageCount > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours!);
      const endPage = Math.min(pageCount - 1, currentPage + pageNeighbours!);
      let _array = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = pageCount - endPage > 1;
      const spillOffset = totalNumbers - (_array.length + 1);

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        _array = [EllipseArrow.LEFT, ...extraPages, ..._array];
      }
      if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        _array = [..._array, ...extraPages, EllipseArrow.RIGHT];
      }
      if (hasLeftSpill && hasRightSpill) {
        _array = [EllipseArrow.LEFT, ..._array, EllipseArrow.RIGHT];
      }
      return [1, ..._array, pageCount];
    }
    return range(1, pageCount);
  }, [currentPage, pageCount]);
  

  const forward = useCallback(() => {
    setPage((oldPage) => {
      if (pageCount < oldPage + 1) return oldPage;
      return oldPage + 1;
    });
  }, [setPage, pageCount]);

  const backward = useCallback(() => {
    setPage((oldPage) => {
      if (oldPage - 1 < 1) return oldPage;
      return oldPage - 1;
    });
  }, [setPage]);

  return {
    getBlocksToRender,
    forward,
    backward,
    pageCount,
  };
}

export { EllipseArrow, usePagination };
