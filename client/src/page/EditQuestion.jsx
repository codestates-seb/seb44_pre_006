import { styled } from "styled-components";
import SideBar from "../component/SideBar";
import { useNavigate } from "react-router";
import AskQuestionForm from "../component/AskQuestionForms";

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

const TitleContainer = styled.section`
  > .editbox {
    > .inputbox {
      width: 70%;
      padding: 5px 5px;
      font-size: 13px;
      border-radius: 3px;
      border: 1px solid;
    }
  }
`;

const BodyText = styled.section`
  > h3 {
    margin-top: 20px;
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
  }
`;
function EditQuestion() {
  const navigate = useNavigate();
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
        <TitleContainer>
          <div className="editbox">
            <div className="edittitle">
              <h3>Title</h3>
            </div>
            <input type="text" className="inputbox"></input>
          </div>
        </TitleContainer>
        <BodyText className="BodyText">
          <h3>Body</h3>
          <AskQuestionForm />
        </BodyText>
        <BottomBtn>
          <div className="bottombtn">
            <button className="savebtn" onClick={() => navigate("/")}>
              Save profile
            </button>
            <button className="canbtn" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </BottomBtn>
      </EditContent>
    </EditContainer>
  );
}

export default EditQuestion;
