import { styled } from "styled-components";
import EditorBox from "../component/TextEditor";

const QuestionForm = styled.div`
  .ask-container {
    > div:first-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 70%;
      margin: 20px 0 50px;
      border: 1px solid var(--black-075);
      border-radius: 3px;
      background-color: #fff;
      padding: 24px;
      flex-shrink: 0;

      .ask-title {
        display: flex;
        flex-direction: column;

        > label {
          color: hsl(210, 8%, 5%);
          font-weight: 600;
          font-size: 17px;
          padding-top: 5px;

          &:last-child {
            font-size: 14px;
            font-weight: normal;
          }
        }
      }
      .askform-body {
        height: 300px;
        margin-top: 30px;
      }
    }
  }
`;

function AskQuestionForm({ askBodySet }) {
  return (
    <QuestionForm>
      <div className="ask-container">
        <div>
          <div className="ask-title">
            <label htmlFor="ask-body">
              Whate are the details of your problem?
            </label>
            <label htmlFor="ask-body">
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </label>
          </div>
          <div className="askform-body" id="ask-body">
            <EditorBox onChangeHandler={askBodySet} />
          </div>
        </div>
      </div>
    </QuestionForm>
  );
}

export default AskQuestionForm;
