import { styled } from "styled-components";
import userNull from "../../asset/User_null.png";
import { useSelector } from "react-redux";

const ProfileContainer = styled.section`
  display: flex;
  height: 12vh;
  width: 100%;
  justify-content: space-between;

  > .leftDiv {
    display: flex;
    height: 100%;
    align-items: center;
    > img {
      height: 100%;
    }
    > p {
      margin-left: 20px;
      font-size: 200%;
    }
  }
`;

export default function ProfileHeader() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <ProfileContainer>
        <div className="leftDiv">
          <img src={userNull} alt="userNull" />
          <p>{user.data.name}</p>
        </div>
      </ProfileContainer>
    </>
  );
}
