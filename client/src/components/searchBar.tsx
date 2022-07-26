import React, { useState } from 'react';
import { SearchValue } from '../pages/allPost';

type Props = {
  searchValue: SearchValue;
  setSearchValue: React.Dispatch<React.SetStateAction<SearchValue>>;
}

export default function SearchBar({ searchValue, setSearchValue }: Props) {
  const [inputValue, setInputValue] = useState('');
  const searchTargets = ['userId', 'title'];

  function handleSearchOption(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== 'userId' && e.target.value !== 'title') return;

    setSearchValue({
      ...searchValue,
      target: e.target.value,
    });
  }

  function handleSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setSearchValue({
      ...searchValue,
      value: e.target.value,
    });
  }

  return (
    <div>
      <select onChange={(e) => handleSearchOption(e)}>
        {searchTargets.map((value, idx) => (
          <option key={idx}>{value}</option>
        ))}
      </select>

      <input onChange={(e) => handleSearchValue(e)} value={inputValue}></input>
    </div>
  );
}