import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 0.5rem;

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 27px;
    padding: 0 0.5rem;
    background-color: var(--white);
    color: var(--black-700);
    text-decoration: none;
    font-size: 0.9rem;
    border: 1px solid var(--black-200);
    border-radius: 0.3rem;
    cursor: pointer;
  }

  > a:hover:not(.active) {
    background-color: rgb(238, 238, 238);
  }

  > a.active {
    background-color: var(--orange-400);
    color: var(--white);
  }

  > a.disabled {
    opacity: 0.2;
  }
`;

function Pagination({ postsPerPage, totalPosts, onPaginate, currentPage, setCurrentPage }) {
  const pageNums = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNums.push(i);
  }

  return (
    <PaginationContainer>
      <a
        className={`${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)}
      >
        Prev
      </a>
      {pageNums.map((num, idx) => (
        <a
          key={idx}
          className={`${currentPage === num ? 'active' : ''}`}
          onClick={() => onPaginate(num)}
        >
          {num}
        </a>
      ))}
      <a
        className={`${currentPage === pageNums.length ? 'disabled' : ''}`}
        onClick={() => setCurrentPage(prev => prev >= pageNums.length ? prev : prev + 1)} 
      >
        Next
      </a>
    </PaginationContainer>
  );
}

export default Pagination;