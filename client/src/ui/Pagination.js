import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 4px;

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

function Pagination({ NumberOfPages = 10, setCurrentPage, questionsPerPage }) {
  // 페이지 수
  const numberOfPages = [];
  for (let i = 1; i <= NumberOfPages; i++) {
    numberOfPages.push(i);
  }

  // 현재 활성 버튼 번호
  const [currentButton, setCurrentButton] = useState(1);

  // 페이지에 표시되는 버튼 배열
  const [arrayOfCurrentButtons, setArrayOfCurrentButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrayOfCurrentButtons];

    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1); // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ]; // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrayOfCurrentButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(
        arrayOfCurrentButtons[arrayOfCurrentButtons.length - 3] + 1,
      );
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrayOfCurrentButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrayOfCurrentButtons[3] - 2);
    }

    setArrayOfCurrentButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
  }, [currentButton]);

  return (
    <PaginationContainer>
      <a
        href={`/questions?size=${questionsPerPage}&page=${currentButton}`}
        className={`${currentButton === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => (prev <= 1 ? prev : prev - 1))}
      >
        Prev
      </a>

      {arrayOfCurrentButtons.map((item, index) => {
        return (
          <a
            href={`/questions?size=${questionsPerPage}&page=${currentButton}`}
            key={index}
            className={`${currentButton === item ? 'active' : ''}`}
            onClick={() => setCurrentButton(item)}
          >
            {item}
          </a>
        );
      })}

      <a
        href={`/questions?size=${questionsPerPage}&page=${currentButton}`}
        className={`${
          currentButton === numberOfPages.length ? 'disabled' : ''
        }`}
        onClick={() =>
          setCurrentButton(prev =>
            prev >= numberOfPages.length ? prev : prev + 1,
          )
        }
      >
        Next
      </a>
    </PaginationContainer>
  );
}

export default Pagination;
