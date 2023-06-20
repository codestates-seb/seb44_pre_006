import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SideBar from '../component/SideBar';
import QuestionItem from '../component/QuestionItem';

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
`;

const MainBarHeader = styled.div`
  display: flex;
  width: 100%;
  height: 50px;

  .mainbar-headline {
    font-size: 1.7rem !important;
    flex: 1 auto !important;
    line-height: 1.3;
    margin: 0 0 1rem;
    display: flex;
  }
`;

const MainBarHeaderAsK = styled.div`
  display: flex;
  margin-left: 12px;
  font-size: 15px;
`;

const AskBtn = styled.a`
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

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <SideBar />
      <Content>
        <MainBar>
          <MainBarHeader>
            <h1 className="mainbar-headline">Top Questions</h1>
            <MainBarHeaderAsK onClick={() => {navigate('/questions/ask');}}>
              <AskBtn>Ask Question</AskBtn>
            </MainBarHeaderAsK>
          </MainBarHeader>
          <QuestionItem />
        </MainBar>
      </Content>
    </Container>
  );
}

export default Home;
