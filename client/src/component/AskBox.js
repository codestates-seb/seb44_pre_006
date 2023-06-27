import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import userNull from "../asset/User_null.png";
import displayCreatedAt from "../utils/displayCreateAt";
import { useSelector } from "react-redux";

const ContentsContainer = styled.section`
  width: 70vw;
  padding: 30px;
`;
const TextField = styled.div``;
const TagField = styled.div``;
const UserField = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  > .editBtn {
    margin: 0;
    color: var(--silver-darker);
    cursor: pointer;
  }
`;
const UserBox = styled.div`
  width: 200px;
  height: 70px;
  background-color: var(--powder-100);
  padding: 5px 7px;
  display: flex;
  flex-direction: column;
  > .askDate {
    margin: 0 0 3px 0;
    color: var(--silver-darker);
    font-size: small;
  }

  > .userInfo {
    flex-grow: 1;
    display: flex;
    align-items: start;
    > img {
      position: relative;
      width: 40px;
      height: auto;
      margin: px;
    }
    > p {
      margin: 0 0 0 10px;
      color: var(--blue-600);
    }
  }
`;
function AskBox({ question }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const onEditHandler = async () => {
    const path = window.location.pathname;
    const questionId = path.slice(path.lastIndexOf("/") + 1);
    navigate(`/question/edit/${questionId}`);
  };

  return (
    <ContentsContainer>
      <TextField>{question.content}</TextField>
      <TagField>{/* 태그 필드 */}</TagField>
      <UserField>
        {question.createdBy === user.data.name || user.data.admin ? (
          <button className="editBtn" onClick={() => onEditHandler()}>
            Edit
          </button>
        ) : (
          <p></p>
        )}
        <UserBox className="userBox">
          <p className="askDate">
            asked {displayCreatedAt(question.createdAt)}
          </p>
          <div className="userInfo">
            <img src={userNull} alt="userNull" />
            <p>{question.createdBy}</p>
          </div>
        </UserBox>
      </UserField>
    </ContentsContainer>
  );
}

export default AskBox;
