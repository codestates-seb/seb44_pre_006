import { styled } from 'styled-components';

export const AskBtn = styled.a`
  font-size: 100%;
  background-color: #0a95ff;
  color: #ffffff;
  width: 101px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 0.3rem;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: #0675ca;
  }
`;

export const BottomBtn = styled.button`
  padding-left: 15px;
  padding-right: 15px;
  margin: 2px;
  width: auto;
  box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
  border: 1px solid var(--black-400);
  border-radius: 3px;
  color: var(--black-900);
  font-size: 13px;
  height: 35px;
  background-color: var(--white);

  &:hover {
    background-color: var(--black-100);
    color: var(--black-700);
    cursor: pointer;
  }

  &:active {
    background-color: var(--orange-500);
    color: white;
  }
`;

export const SortBtn = styled.button`
  display: blcok;
  box-sizing: boreder-box;
  align-items: center;
  background-color: transparent;
  margin-left: -1px;
  padding: 0.5rem;
  width: auto;
  height: 35px;
  border: 1px solid rgb(159, 166, 173);
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
  color: var(--black-800);
  &:hover {
    background-color: var(--black-025);
  }
  &:focus {
    background-color: var(--black-050);
  }
  &:active {
    background-color: var(--black-100);
    color: black;
    border-style: initial;
  }
`;
