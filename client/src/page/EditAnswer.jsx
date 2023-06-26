import { styled } from "styled-components";
import SideBar from "../component/SideBar";
import { useNavigate } from "react-router";
import AskQuestionForm from "../component/AskQuestionForms";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditQuestion } from "../api/editQuestion"
import { fetchEditAnswer } from "../api/editAnswer";
import { setQuestion } from "../store/questionSlice";

const EditContainer = styled.div`
  max-width: 1264px;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: left;
`;
const EditContent = styled.div`
  max-width: 1264px;
  min-height: 750px;
  width: 100%;
  padding: 0 24px 24px;
`;

const YellowBox = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;

  > div {
    width: 70%;
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 3px;
    background: var(--yellow-050);
    border: 1px solid var(--yellow-300);
    > p {
      margin: 0;
      font-style: 15px;
      margin-bottom: 15px;
    }
  }
`;

const BodyText = styled.section`
  > h3 {
    margin-top: 20px;
  }
`;

const DeleBoxContainer = styled.section`
  > div {
    width: 70%;
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 3px;
    border-top: 1px solid var(--black-200);
  }
`;
const BottomBtn = styled.section`
  > .bottombtn {
    margin-top: 10px;
    display: flex;
    align-items: start;
    > .savebtn {
      margin: 4px;
      padding: 10px;
      border: 1px solid var(--blue-600);
      border-radius: 3px;
      color: #fff;
      background-color: var(--blue-500);
      cursor: pointer;
      &:hover {
        background-color: var(--blue-600);
      }
    }
    > .canbtn {
      margin-left: 10px;
      margin: 4px;
      padding: 10px;
      border: 1px solid var(--white);
      border-radius: 3px;
      color: var(--blue-500);
      background-color: var(--white);
      cursor: pointer;
      &:hover {
        background-color: var(--powder);
      }
    }
    > .delebtn {
      margin: 4px;
      padding: 10px;
      border: 1px solid var(--red-700);
      border-radius: 3px;
      color: #fff;
      background-color: var(--red-600);
      cursor: pointer;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:hover {
        &:disabled {
          background-color: var(--red-700);
        }
      }
    }
  }
`;

function EditAnswer() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const path = window.location.pathname;
  const questionId = path.slice(path.lastIndexOf("/") + 1);

  const onSaveHandler = async () => {
    const titles = titleRef.current.value;
    dispatch(fetchEditQuestion({ questionId, titles, content }));
    navigate(`/question/${questionId}`);
  };

  const onCancleHandler = async () => {
    navigate(`/question/${questionId}`);
  };

  return (
    <EditContainer>
      <SideBar />
      <EditContent>
        <YellowBox>
          <div>
            <p>
              Your edit will be placed in a queue until it is peer reviewed.
            </p>
            <br />
            <p>
              We welcome edits that make the post easier to understand and more
              valuable for readers. Because community members review edits,
              please try to make the post substantially better than how you
              found it, for example, by fixing grammar or adding additional
              resources and hyperlinks.
            </p>
          </div>
        </YellowBox>
        <h2>Answer</h2>
        <BodyText className="BodyText">
          <h3>Body</h3>
          <AskQuestionForm setContent={setContent} />
          <DeleBoxContainer>
            <div>
              <label className="checkinput">
                <input type="checkbox" />I have read the information stated
                above and understand the implications of having my question
                deleted. I wish to proceed with the deletion of my question.
              </label>
            </div>
          </DeleBoxContainer>
        </BodyText>
        <BottomBtn>
          <div className="bottombtn">
            <button className="savebtn" onClick={() => onSaveHandler()}>
              Save edits
            </button>
            <button className="canbtn" onClick={() => onCancleHandler()}>
              Cancel
            </button>
            <button className="delebtn">Delete</button>
          </div>
        </BottomBtn>
      </EditContent>
    </EditContainer>
  );
}

export default EditAnswer;
