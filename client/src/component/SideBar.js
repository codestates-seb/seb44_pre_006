import styled from "styled-components";
import  QuestionIcon  from "../asset/question.svg";

const SideContainer = styled.div`
border: 1px solid #CCCCCC;
flex-direction: column;
display: flex;
width: 164px;
height: 550px;




.side-container{
    list-style-type: none;
    width: 240px;
    padding: 32px 12px 12px 20px;
    cursor: pointer;
    line-height: 200%;
    
    
}
li{
    font-size: 14px;
    color: gray;
}


`;
const QuestionClick = styled.div`
      font-weight: bold;
      border-right: 3px solid rgb(244, 130, 37);
      width: 59%;
      background-color: #e2e2e2;
`
const LogoImg =styled.img`
    margin: 0 6px;
`

const User = styled.div`
     padding: 0 0 0 30px;
`
const SideBar = () => {
  return (
    <SideContainer>
      <ul className="side-container">
        <li>Home</li>
        <li>PUBLIC</li>
        <QuestionClick> 
            <LogoImg src={QuestionIcon}/>
            <span>Question</span>
        </QuestionClick>
       
        <User>
            <p>Users</p>
        </User>
      </ul>
    </SideContainer>
  );
};

export default SideBar;




