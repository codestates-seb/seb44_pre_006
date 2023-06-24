import styled from 'styled-components';
import QuestionIcon from '../asset/question.svg';
import { useNavigate } from 'react-router-dom';

const SideContainer = styled.div`
display: flex;
border-right:1px solid var(--silver);
width: 12vw;
height: calc(100vh - 50px - 70px);

.side-container{
    margin: 20px 0 0 0;
    padding: 0;
    list-style-type: none;
    position: relative;
    left: 0;
    cursor: pointer;
    line-height: 200%;
  }

li{
    font-size: 14px;
    color: var(--black-500);
  }
`;
const QuestionClick = styled.div`
  display: flex;
  font-weight: bold;
  border-right: 3px solid rgb(244, 130, 37);
  background-color: #e2e2e2;
  > img {
    margin-right: 10px;
    width: 20px;
  }
`;

const User = styled.div`
  margin-left: 30px;
`;
const SideBar = () => {

  const navigate = useNavigate()
  
  return (
    <SideContainer className='SideContainer'>
      <ul className="side-container">
        <li onClick={() => navigate('/home')}>Home</li>
        <li>PUBLIC</li>
        <QuestionClick onClick={() => navigate('/question')}>
          <img src={QuestionIcon} />
          <span>Question</span>
        </QuestionClick>
        <User onClick={() => navigate('/user')}>
          <p>Users</p>
        </User>
      </ul>
    </SideContainer>
  );
};

export default SideBar;
