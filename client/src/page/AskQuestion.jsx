import { styled } from "styled-components";
import { background_image } from '/Users/dlwlgy/codestates/pre-project/seb44_pre_006/client/src/asset/question_notice_background.svg';

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  background-color: var(--black-025);
  display: flex;
  justify-content: center;
  text-align: left;
`

const Content = styled.div`
  max-width: 1264px;
  min-height: 750px;
  width: 100%;
  border: 1px solid var(--black-100);
  /* border-left: 0;
  border-right: 0; */
  padding: 0 24px 24px;

  .box-border {
    width: 100%; 
  }
`;

const QuestionNotice = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticeHeader = styled.div`
  margin-bottom: 12px;
  width: 100%;
  display: flex;
  background-repeat: no-repeat;
  background-position: right bottom;
  align-items: center;
  background-image: url(https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368);

  .question-notice-title {
    margin: 24px 0 27px;
    font-size: 1.8rem;
    line-height: 1.3;
  }
`;


function AskQuestion() {
  return (
    <Container>
      <Content>
        <div className="box-border">
          <QuestionNotice>
            <NoticeHeader>
              <h1 className="question-notice-title">Ask a public question</h1>
            </NoticeHeader>
          </QuestionNotice>
        </div>
      </Content>
    </Container>
  );
}

export default AskQuestion;