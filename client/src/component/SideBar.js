import styled from 'styled-components';
import QuestionIcon from '../asset/question.svg';
import { useNavigate } from 'react-router-dom';

const SideContainer = styled.div`
  display: flex;
  border-right: 1px solid var(--silver);
  height: calc(100vh - 50px - 70px);
  width: 13vw;
  justify-content: end;

  .side-container {
    margin-top: 30px;
    list-style-type: none;
    position: relative;
    left: 0;
    cursor: pointer;
    line-height: 240%;
  }

  li {
    font-size: 14px;
    &:hover {
      background-color: var(--black-050);
    }
  }
`;

const QuestionClick = styled.div`
  display: flex;
  font-weight: bold;
  padding-right: 3vw;
  &:hover {
    background-color: var(--black-050);
  }

  > img {
    margin-right: 10px;
    width: 20px;
  }
`;

const User = styled.div`
  padding-left: 30px;
  &:hover {
    background-color: var(--black-050);
  }
`;

const SideBar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <SideContainer className="SideContainer">
      <ul className="side-container">
        <li
          onClick={() => navigate('/home')}
          style={{ borderRight: path === '/home' ? '3px solid var(--orange)' : 'none' }}
        >
          Home
        </li>
        <li>PUBLIC</li>
        <QuestionClick
          onClick={() => navigate('/question')}
          style={{ borderRight: path === '/question' ? '3px solid var(--orange)' : 'none' }}
        >
          <img src={QuestionIcon} alt="Question Icon" />
          <span>Question</span>
        </QuestionClick>
        <User
          onClick={() => navigate('/user')}
          style={{ borderRight: path === '/user' ? '3px solid var(--orange)' : 'none' }}
        >
          <p>Users</p>
        </User>
      </ul>
    </SideContainer>
  );
};

export default SideBar;
