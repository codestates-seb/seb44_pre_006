import { styled } from "styled-components";
import SideBar from "../component/SideBar";
import { useNavigate } from "react-router";
import EditHeader from "../component/user/EditHeader";
import ProfileCartegory from "../component/user/ProfileCategory";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditUser } from "../api/editUser";
import {setUser} from "../store/userSlice";

const EditPageContainer = styled.div`
  display: flex;
  width: 1264px;
`;
const EditContainer = styled.div`
  width: 100%;
  margin: 30px;
`;

const EditBoxContainer = styled.section`
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
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const onSaveHandler = async () => {
    const names = nameRef.current.value;
    const passwords = passwordRef.current.value;
    const memberId = user.data.memberId
    console.log(names);
    console.log(memberId);

    dispatch(fetchEditUser({ memberId, names, passwords }));
    dispatch(setUser(names));
    navigate(`/user/${memberId}`);
  };

  const onCancleHandler = async () => {
    const memberId = user.data.memberId
    navigate(`/user/${memberId}`);
  }

  return (
    <EditPageContainer>
      <SideBar />
      <EditContainer>
        <EditHeader />
        <ProfileCartegory text={`Settings`} />
        <EditBoxContainer>
          <h2>Edit your profile</h2>
          <div className="editbox">
            <div className="edittitle">
              <p>display name</p>
            </div>
            <input type="text" className="inputbox" ref={nameRef}></input>
            <div className="edittitle">
              <p>password</p>
            </div>
            <input type="text" className="inputbox" ref={passwordRef}></input>
          </div>
          <div className="bottombtn">
            <button className="savebtn" onClick={() => onSaveHandler()}>
              Save profile
            </button>
            <button className="canbtn" onClick={() => onCancleHandler()}>
              Cancel
            </button>
          </div>
        </EditBoxContainer>
      </EditContainer>
    </EditPageContainer>
  );
}

export default EditProfile;
