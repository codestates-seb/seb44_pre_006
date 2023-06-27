import React from 'react';
import styled from 'styled-components';
import searchLogo from '../../../asset/search_logo.svg';

const Container = styled.div`
  margin: 0 0 0.75rem;
  width: 100%;
  text-align: left;
`;

const SearchBarWrapper = styled.div`
  max-width: 16.8rem;
  display: flex;
  position: relative;

  > img {
    position: absolute;
    left: 0.5em;
    top: 18%;
  }
`;

const UserFilterInput = styled.input`
  width: 100%;
  color: var(--black-900);
  font-size: 13px;
  outline: none;
  border: none;
  padding: 7.8px 9.1px 7.8px 32px;
  border: 1px solid var(--black-200);
  border-radius: 3px;
  width: 100%;

  &::placeholder {
    color: var(--black-200);
  }

  &:focus {
    border-color: var(--blue-400);
    outline: 0;
    box-shadow: 0 0 0 4px var(--blue-100);
  }
`;

function SearchBar({ handleSearch, searchText, setSearchText }) {
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchText);
      setSearchText('');
    }
  };

  console.log(searchText);

  return (
    <Container>
      <SearchBarWrapper>
        <img src={searchLogo} alt="search-logo" />
        <UserFilterInput
          type="text"
          placeholder="Filter by user"
          value={searchText}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
      </SearchBarWrapper>
    </Container>
  );
}

export default SearchBar;
