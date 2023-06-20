import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SideBar from '../component/SideBar';
import { AskBtn, BottomBtn, SortBtn } from '../component/Buttons';

const Container = styled.div`
  max-width: 1264px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  text-align: left;
  font-size: 100%;
`;

const Content = styled.div`
  display: flex;
  padding: 24px 16px;
  max-width: 727px;
  background-color: #ffffff;
  border: 1px solid #d6d9dc;
  min-height: 100%;
  box-sizing: inherit;
`;

const MainBar = styled.main`
  margin: 0;
  padding: 0;
  min-height: 100%;
  display: flex;
  box-sizing: inherit;
  flex-direction: column;
`;

const MainBarHeader = styled.div`
  display: flex;
  width: 100%;
  max-width: 727px;
  height: 50px;

  .mainbar-headline {
    font-size: 1.7rem !important;
    flex: 1 auto !important;
    line-height: 1.3;
    max-width: 727px;
    margin: 0 0 1rem;
    display: flex;
  }
`;

const MainBarHeaderAsK = styled.div`
  margin-left: 12px;
  font-size: 15px;
  box-sizing: border-box;
`;

const SecondContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 6px;
  justify-content: space-between;
  align-items: center;
`;

const TotalQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  line-height: 18px;
  float: left;
  font-size: 12px;
`;

const SortBtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: auto;
  font-size: 17px;
  color: var(--black-600);
`;

const FooterBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 80px;
  border-top: 1px solid var(--black-075);
`;

function AllQuestion() {
  const navigate = useNavigate();

  return (
    <Container>
      <SideBar />
      <Content>
        <MainBar>
          <MainBarHeader>
            <h1 className="mainbar-headline">All Questions</h1>
            <MainBarHeaderAsK
              onClick={() => {
                navigate('/questions/ask');
              }}
            >
              <AskBtn>Ask Question</AskBtn>
            </MainBarHeaderAsK>
          </MainBarHeader>
          <SecondContainer>
            <TotalQuestions>
              <h2>total questions</h2>
            </TotalQuestions>
            <SortBtnContainer>
              <div>
                <SortBtn>Newest</SortBtn>
                <SortBtn>Unanswered</SortBtn>
              </div>
            </SortBtnContainer>
          </SecondContainer>
          <FooterBtnContainer>
            <div>
              <BottomBtn>Prev</BottomBtn>
              <BottomBtn>1</BottomBtn>
              <BottomBtn>2</BottomBtn>
              <BottomBtn>3</BottomBtn>
              <BottomBtn>4</BottomBtn>
              <BottomBtn>5</BottomBtn>
              <BottomBtn>Next</BottomBtn>
            </div>
          </FooterBtnContainer>
        </MainBar>
      </Content>
    </Container>
  );
}

export default AllQuestion;
