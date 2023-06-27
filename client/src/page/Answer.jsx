import { styled } from "styled-components";
import SideBar from "../component/SideBar"
import {AskBtn} from "../component/Buttons"
import { useNavigate } from "react-router-dom";
import AskBox from "../component/AskBox";
import AnswerBox from "../component/AnswerBox";
import AskQuestionForm from "../component/AskQuestionForms";
import {PostQuestionBtn} from "../page/AskQuestion";
import { useEffect , useState} from "react";
import { useDispatch } from "react-redux";
import fetchGetQuestion from "../api/getQuestion"
import displayCreatedAt from '../utils/displayCreateAt';
import Loader from '../ui/Loader';
import {fetchSetAnswer} from "../api/setAnswer"

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

const AnswerTextArea = styled.section`
  
`


function Answer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const path = window.location.pathname;
  const questionId = path.slice(path.lastIndexOf("/") + 1);

  const handleSubmit = () => {
    if(answerContent === ""){
      console.log(question)
    }
    else{
      console.log(answerContent)
      dispatch(fetchSetAnswer({questionId , answerContent })).then(window.location.reload())
      
    }
  };

  useEffect(() => {
    dispatch(fetchGetQuestion(questionId)).then(data => setQuestion(data.payload.data));
  },[])
  
  return (
    <Main>
    <SideBar/>
    {question
    ? (
    <AnswertContainer className="AnswertContainer">
      <AnswerHeader className="AnswerHeader">
        <div className="topDiv">
          <h2>{question.title}</h2>
          <AskBtn onClick={() => navigate('/question/ask')}>Ask Question</AskBtn>
        </div>
        <div className="bottomDiv">
          <div className="infoBox">
            <p>Asked  &nbsp;</p>
            <p>{displayCreatedAt(question.createdAt)}</p>  
          </div>
          <div className="infoBox">
            <p>Modified  &nbsp;</p>
            <p>{displayCreatedAt(question.modifiedAt)}</p> 
          </div>
          <div className="infoBox">
            <p>Viewed  &nbsp;</p>
            <p>{question.viewCount} times</p> 
          </div>
        </div>
      </AnswerHeader>

      <AnswerContentBody className="AnswerContentBody">
        <AskBox question={question}/>
        <h2>{`${question.answers.length} Answers`}</h2>
        {question.answers.map(answer => (
        <AnswerBox key={answer.answerId} answer={answer}/>
      ))}
      </AnswerContentBody>

      <AnswerTextArea className="AnswerTextArea">
        <h2>Your Answer</h2>
        <AskQuestionForm setContent={setAnswerContent}/>
        <PostQuestionBtn onClick={() => handleSubmit()}>
          Post your Answer
        </PostQuestionBtn>
      </AnswerTextArea>
    </AnswertContainer>
    )
    : <Loader />
    }
    </Main>
  );
}

export default Answer;