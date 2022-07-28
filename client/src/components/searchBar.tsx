import React from 'react';
import styled from 'styled-components';
import { SearchValue } from '../pages/allPost';

type Props = {
  searchValue: SearchValue;
  setSearchValue: React.Dispatch<React.SetStateAction<SearchValue>>;
}

export default function SearchBar({ searchValue, setSearchValue }: Props) {
  const searchTargets = ['title', 'userId'];

  function handleSearchOption(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== 'userId' && e.target.value !== 'title') return;

    setSearchValue({
      ...searchValue,
      target: e.target.value,
    });
  }

  function handleSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue({
      ...searchValue,
      value: e.target.value,
    });
  }

  return (
    <StyledSearchBar>
      <select onChange={(e) => handleSearchOption(e)}>
        {searchTargets.map((value, idx) => (
          <option key={idx}>{value}</option>
        ))}
      </select>

      <input onChange={(e) => handleSearchValue(e)} ></input>
    </StyledSearchBar>
  );
}

const StyledSearchBar = styled.div`
  select {
    padding: 1px;
  }
`;
