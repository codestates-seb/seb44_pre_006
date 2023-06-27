import { styled } from "styled-components";
import Writing from "../asset/writing_img.png";
import AskQuestionForm from "../component/AskQuestionForms";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAskQuestions } from "../api/askquestion";
import { useState } from "react";
import { useRef } from "react";

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  background-color: var(--black-025);
  display: flex;
  justify-content: center;
  text-align: left;
`;

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

const QuestionBlueBox = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;

  > div {
    width: 70%;
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 3px;
    background: #ebf4fb;
    border: 1px solid var(--powder-400);
    > h3,
    h4,
    p {
      margin: 0;
    }
    > h3 {
      font-weight: 400;
      font-size: 21px;
      margin: 0 0 8px;
      line-height: 1.3;
    }
    > p {
      font-style: 15px;
      margin-bottom: 15px;
    }
    > h4 {
      font-size: 13px;
      margin-bottom: 8px;
    }

    > p:last-child {
      margin: 0;
      > ul {
        margin-left: 15px;
        > li {
          font-size: 13px;
          line-height: 1.3;
          list-style-type: disc;
          list-style-position: inside;
        }
      }
    }
  }
`;

const QuestionTitleContainer = styled.div`
  display: flex;

  > div:first-child {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 8px 8px 8px 0;
    border: 1px solid var(--black-075);
    border-radius: 3px;
    background-color: #fff;
    padding: 24px;
    flex-shrink: 0;

    .qs-title {
      display: flex;
      flex-direction: column;

      > label {
        color: hsl(210, 8%, 5%);
        font-size: 17px;
        font-weight: 600;
        padding-top: 5px;

        &:last-child {
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: 7px;
  padding: 8px 9px;
  font-size: 13px;
  border-radius: 3px;
  border: 1px solid;
  outline: none;
`;

const LogoImg = styled.img`
  width: 30%;
  margin: 8px;
`;

export const PostQuestionBtn = styled.button`
  margin: 4px;
  padding: 10px;
  border: 1px solid var(--blue-600);
  border-radius: 3px;
  color: #fff;
  background-color: var(--blue-500);
  cursor: pointer;
`;

function AskQuestion() {
  // const [askTitle, askTitleSet] = useState("");
  // const [askBody, askBodySet] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleref = useRef(null);
  const [contents, setContent] = useState("");

  const handleSubmit = () => {
    const titles = titleref.current.value;
    dispatch(fetchAskQuestions({ titles, contents }));
    navigate("/question");
  };

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
        <QuestionBlueBox>
          <div>
            <h3>Writing a good question</h3>
            <p>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process. <br />
              Looking to ask a non-programming question? See the topics here to
              find a relevant site.
            </p>
            <h4>Steps</h4>
            <p>
              <ul>
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>
                  Describe what you tried and what you expected to happen.
                </li>
                <li>
                  Add “tags” which help surface your question to members of the
                  community.
                </li>
                <li>Review your question and post it to the site.</li>
              </ul>
            </p>
          </div>
        </QuestionBlueBox>
        <QuestionTitleContainer>
          <div>
            <div className="qs-title">
              <label htmlFor="title">Title</label>
              <label htmlFor="title">
                Be specific and imagine you’re asking a question to another
                person.
              </label>
            </div>
            <div>
              <Input
                type="text"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                ref={titleref}
              ></Input>
            </div>
          </div>
          <LogoImg src={Writing} alt="이미지 안보임 " />
        </QuestionTitleContainer>
        <AskQuestionForm setContent={setContent} />
        <PostQuestionBtn onClick={() => handleSubmit()}>
          Post your question
        </PostQuestionBtn>
      </Content>
    </Container>
  );
}

export default AskQuestion;
