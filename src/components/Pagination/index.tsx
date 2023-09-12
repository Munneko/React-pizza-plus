import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  onChangePage: (page: number) => void;
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage, pageCount }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={pageCount}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
