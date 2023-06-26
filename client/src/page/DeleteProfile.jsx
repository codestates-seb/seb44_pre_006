import { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../component/SideBar';
import EditHeader from '../component/user/EditHeader';
import ProfileCartegory from '../component/user/ProfileCategory';
import { fetchDeleteUser } from '../api/deleteUser';

const DelePageContainer = styled.div`
  max-width: 1264px;
  display: flex;
  justify-content: center;
`;

const DeleContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 30px;
`;

const DeleBoxContainer = styled.section`
  > div {
    width: 70%;
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 3px;
    border-top: 1px solid var(--black-200);

    > p {
      margin: 0;
      font-style: 15px;
      margin-bottom: 15px;
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

const DeleteBtn = styled.button`
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
`;

function DeleteProfile() {
  const [isChecked, setIsChecked] = useState(false);
  const memberId = useSelector(state => state.user.data.memberId)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(memberId);
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteProfile = async () => {
    await dispatch(fetchDeleteUser({ memberId }))
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <DelePageContainer>
      <SideBar />
      <DeleContainer>
        <EditHeader />
        <ProfileCartegory text={`Settings`} />
        <h2>Delete Profile</h2>
        <DeleBoxContainer>
          <div>
            <p>
              Before confirming that you would like your profile deleted, we'd
              like to take a moment to explain the implications of deletion:
            </p>
            <p>
              <ul>
                <li>
                  Deletion is irreversible, and you will have no way to regain
                  any of your original content, should this deletion be carried
                  out and you change your mind later on.
                </li>
                <li>
                  Your questions and answers will remain on the site, but will
                  be disassociated and anonymized (the author will be listed as
                  "user22064595") and will not indicate your authorship even if
                  you later return to the site.
                </li>
              </ul>
            </p>
            <p>
              Confirming deletion will only delete your profile on Stack
              Overflow - it will not affect any of your other profiles on the
              Stack Exchange network. If you want to delete multiple profiles,
              you'll need to visit each site separately and request deletion of
              those individual profiles.
            </p>
            <label className="checkinput">
              <input type="checkbox" onChange={handleCheckBoxChange} />I have
              read the information stated above and understand the implications
              of having my profile deleted. I wish to proceed with the deletion
              of my profile.
            </label>
          </div>
          <DeleteBtn disabled={!isChecked} onClick={() => handleDeleteProfile()}>
            Delete Profile
          </DeleteBtn>
        </DeleBoxContainer>
      </DeleContainer>
    </DelePageContainer>
  );
}

export default DeleteProfile;
