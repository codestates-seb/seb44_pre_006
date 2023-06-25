import { styled } from "styled-components";
import SideBar from "../component/SideBar";
import { useNavigate } from "react-router";

const EditPageContainer = styled.div`
  display: flex;
`;
const EditContainer = styled.div`
  width: 100%;
  margin: 30px;
`;

const EditBoxContainer = styled.section`
  margin-left: 20px;

  > .editbox {
    > .edittitle {
      margin-top: 30px;
      font-size: 17px;
      font-weight: bold;
    }
    > .inputbox {
      width: 300px;
      margin-top: 5px;
      padding: 5px 5px;
      font-size: 13px;
      border-radius: 3px;
      border: 1px solid;
    }
  }
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
function EditProfile() {
  const navigate = useNavigate();
  return (
    <EditPageContainer>
      <SideBar />
      <EditContainer>
        <EditBoxContainer>
          <h2>Edit your profile</h2>
          <div className="editbox">
            <div className="edittitle">
              <p>display name</p>
            </div>
            <input type="text" className="inputbox"></input>
            <div className="edittitle">
              <p>password</p>
            </div>
            <input type="text" className="inputbox"></input>
          </div>
          <div className="bottombtn">
            <button
              className="savebtn"
              onClick={() => navigate("user/profile")}
            >
              Save profile
            </button>
            <button className="canbtn" onClick={() => navigate("user/profile")}>
              Cancel
            </button>
          </div>
        </EditBoxContainer>
      </EditContainer>
    </EditPageContainer>
  );
}

export default EditProfile;
