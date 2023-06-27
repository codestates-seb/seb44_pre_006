import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../component/SideBar';
import QuestionItem from '../component/QuestionItem';
import { fetchTopQuestions } from '../api/topQuestion';
import Loader from '../ui/Loader';
// import dummy from '../data/dummy';

const Container = styled.div`
  max-width: 1264px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  position: relative;
  text-align: left;
  font-size: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  padding: 24px 16px;
  max-width: 751px;
  background-color: #ffffff;
  border: 1px solid #d6d9dc;
  min-height: 100%;
`;

const MainBar = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const MainBarHeaderWrapper = styled.div`
  display: flex;

  .mainbar-header {
    display: flex;
    width: 100%;
    height: 50px;
  }
`;

const MainbarHeadline = styled.h1`
  font-size: 1.7rem !important;
  flex: 1 auto !important;
  line-height: 1.3;
  margin: 0 0 1rem;
  display: flex;
`;

const MainBarHeaderAsK = styled.div`
  display: flex;
  margin-left: 12px;
  font-size: 0.9rem;
`;

const AskBtn = styled.a`
  padding: 0.65rem;
  width: 101px;
  height: 35px;
  white-space: nowrap;
  background-color: #0a95ff;
  color: #ffffff;
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

function Home() {
  const { status, questions } = useSelector((state) => state.question);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTopQuestions());
  }, [dispatch]);

  const onAskQuestionButtonHandler = () => {
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      navigate('/question/ask');
    } else {
      navigate('/user/login');
    }
  };;
  
  return (
    <Container>
      <SideBar />
      <Content>
        <MainBar>
          <MainBarHeaderWrapper>
            <div className="mainbar-header">
              <MainbarHeadline>Top Questions</MainbarHeadline>
              <MainBarHeaderAsK
                onClick={onAskQuestionButtonHandler}
              >
                <AskBtn>Ask Question</AskBtn>
              </MainBarHeaderAsK>
            </div>
          </MainBarHeaderWrapper>
          {status === 'loading' && <Loader />}
          {status === 'succeed' &&
            questions.map((item) => (
              <QuestionItem key={item.questionId} {...item} />
            ))}
        </MainBar>
      </Content>
    </Container>
  );
}

export default Home;
