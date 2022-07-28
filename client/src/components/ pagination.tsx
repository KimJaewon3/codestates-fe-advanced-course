import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

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
    <StyledPagenation>
      <nav>
        <ul>
          <StyledLi>
            <IoIosArrowDropleftCircle size={25} onClick={() => changePage(page - 1)}/>
          </StyledLi>
          {pageCount.map((_, idx) => (
            <StyledLi key={idx}>
              <button 
                className={page === (idx + 1) ? 'pagenation-current-page' : ''}
                onClick={() => changePage(idx + 1)}
              >
                {idx + 1}
              </button>
            </StyledLi>
          ))}
          <StyledLi>
            <IoIosArrowDroprightCircle size={25} onClick={() => changePage(page + 1)}/>
          </StyledLi>
        </ul>
      </nav>
    </StyledPagenation>
  );
}

const StyledPagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .pagenation-current-page {
    background-color: #bbbbbb;
  }
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    button {
      border: none;
      border-radius: 50%;
    }
  }
  svg {
    display: block;
  }
`;

const StyledLi = styled.li`
  float: left;
  & + & {
    margin-left: 20px;
  }
`;
