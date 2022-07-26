import React from 'react';

type Props = {
  contentsCount: number;
  postLimit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ contentsCount, postLimit, page, setPage }: Props) {
  const pageCount = new Array(Math.ceil(contentsCount / postLimit)).fill(false);

  function changePage(pageNumber: number) {
    if (pageNumber <= 0 || pageNumber > pageCount.length) return;
    setPage(pageNumber);
  }
  
  return (
    <div>
      <ul>
        <li>
          <button onClick={()=>changePage(page - 1)}>pre</button>
        </li>
        {pageCount.map((_, idx) => (
          <li key={idx}>
            <button onClick={()=>changePage(idx + 1)}>{idx + 1}</button>
          </li>
        ))}
        <li>
          <button onClick={()=>changePage(page + 1)}>next</button>
        </li>
      </ul>
    </div>
  );
}
