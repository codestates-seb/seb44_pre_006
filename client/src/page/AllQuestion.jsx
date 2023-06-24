import { styled } from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SideBar from '../component/SideBar';
import QuestionItem from '../component/QuestionItem';
import { fetchAllQuestions } from '../api/question';
import Loader from '../ui/Loader';
import Pagination from '../ui/Pagination';
import dummy from '../data/dummy';

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

const DataControllerWrapper = styled.div`
  display: flex;

  .data-controller-box {
    width: 100%;
    display: flex;
    margin-bottom: 12px;
    justify-content: space-between;
    align-items: center;
  }
`;

const TotalQuestions = styled.div`
  display: flex;
  font-size: 1.065rem;
`;

const DataFilterWrapper = styled.div`
  display: flex;

  .data-filter-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const NewestButton = styled.a`
  background-color: var(--white);
  color: var(--black-500);
  border: 1px solid var(--black-400);
  border-radius: 0.2rem 0 0 0.2rem;
  display: flex;
  padding: 0.6rem;
  cursor: pointer;

  &:hover {
    background-color: var(--black-025);
    color: var(--black-700);
  }

  &:active {
    box-shadow: 0 0 0 4px hsla(210,8%,15%,0.1);
  }

  &:focus {
    background-color: var(--black-075);
  }

  .newest-button {
    display: flex;
    font-size: 0.83rem;
  }
`;

const UnansweredButton = styled.a`
  background-color: var(--white);
  color: var(--black-500);
  border: 1px solid var(--black-400);
  border-radius: 0 0.2rem 0.2rem 0;
  display: flex;
  padding: 0.6rem;
  cursor: pointer;
  border-left: 0;

  &:hover {
    background-color: var(--black-025);
    color: var(--black-700);
  }

  &:active {
    box-shadow: 0 0 0 4px hsla(210,8%,15%,0.1);
  }

  &:focus {
    background-color: var(--black-075);
  }

  .unanswered-button {
    display: flex;
    font-size: 0.83rem;
  }
`;

function AllQuestion() {
  const { status, questions } = useSelector(state => state.question);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  const indexOfLastPage = currentPage * questionsPerPage;
  const indexOfFirstPage = indexOfLastPage - questionsPerPage;
  const currentPageQuestions = dummy.slice(indexOfFirstPage, indexOfLastPage);
  const NumberOfPages = Math.ceil(dummy.length / questionsPerPage);

  return (
    <Container>
      <SideBar />
      <Content>
        <MainBar>
          <MainBarHeaderWrapper>
            <div className="mainbar-header">
              <MainbarHeadline>Top Questions</MainbarHeadline>
              <MainBarHeaderAsK
                onClick={() => {
                  navigate('/question/ask');
                }}
              >
                <AskBtn>Ask Question</AskBtn>
              </MainBarHeaderAsK>
            </div>
          </MainBarHeaderWrapper>
          <DataControllerWrapper>
            <div className="data-controller-box">
              <TotalQuestions>{questions.length} questions</TotalQuestions>
              <DataFilterWrapper>
                <div className="data-filter-box">
                  <NewestButton>
                    <div className="newest-button">Newest</div>
                  </NewestButton>
                  <UnansweredButton>
                    <div className="unanswered-button">Unanswered</div>
                  </UnansweredButton>
                </div>
              </DataFilterWrapper>
            </div>
          </DataControllerWrapper>
          {status === 'loading' && <Loader />}
          {status === 'succeed' && questions.map(item => <QuestionItem key={item.questionId} {...item} />)}
          {dummy.map(item => <QuestionItem key={item.questionId} {...item} />)}
          <Pagination NumberOfPages={NumberOfPages} setCurrentPage={setCurrentPage} questionsPerPage={questionsPerPage}/>
        </MainBar>
      </Content>
    </Container>
  );
}

export default AllQuestion;
