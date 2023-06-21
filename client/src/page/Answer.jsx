import { styled } from "styled-components";
import SideBar from "../component/SideBar"
import '../Global.css';
import {AskBtn} from "../component/Buttons"
import { useNavigate } from "react-router-dom";
import AskBox from "../component/AskBox";
import AnswerBox from "../component/AnswerBox";

const Main = styled.div`
  display: flex;
`
const AnswertContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 30px;
`
const AnswerHeader = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--silver-darker);
  width: 70vw;
  
  
  > .topDiv{
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    >h2{
      margin: 0px;
    }
  }
  > .bottomDiv{
    flex-grow: 1;
    display: flex;
    > .infoBox{
      margin-right: 20px;
      display: flex;
      & > :first-child {
        color: var(--silver-darker);
      }
      & > :last-child {
        color: var(--black);
      }
    }
  }
`
const AnswerContentBody = styled.section`

`


function Answer() {

  const navigate = useNavigate();

  return (
    <Main>
    <SideBar/>
    <AnswertContainer className="AnswertContainer">
      <AnswerHeader className="AnswerHeader">
        <div className="topDiv">
          <h2>제목 입니다.</h2>
          <AskBtn onClick={() => navigate('/questions/ask')}>Ask Question</AskBtn>
        </div>
        <div className="bottomDiv">
          <div className="infoBox">
            <p>Asked  &nbsp;</p>
            <p>today</p>  
          </div>
          <div className="infoBox">
            <p>Modified  &nbsp;</p>
            <p>today</p> 
          </div>
          <div className="infoBox">
            <p>Viewed  &nbsp;</p>
            <p>40</p> 
          </div>
        </div>
      </AnswerHeader>
      <AnswerContentBody>
        <AskBox />
        <h2>2 Answers</h2>
        <AnswerBox/>
        <AnswerBox/>
        <h2>Your Answer</h2>
      </AnswerContentBody>
    </AnswertContainer>
    </Main>
  );
}

export default Answer;