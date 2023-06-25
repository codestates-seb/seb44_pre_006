import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import searchLogo from '../../../asset/search_logo.svg';
import fetchSearchUser from '../../../api/searchUser'

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

function SearchBar(users) {
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const searchText = event.target.value;
      event.target.value = '';
    }
  };

  return (
    <Container>
      <SearchBarWrapper>
        <img src={searchLogo} alt="search-logo" />
        <UserFilterInput
          type="text"
          placeholder="Filter by user"
          onKeyPress={handleKeyPress}
        />
      </SearchBarWrapper>
    </Container>
  );
}

export default SearchBar;
