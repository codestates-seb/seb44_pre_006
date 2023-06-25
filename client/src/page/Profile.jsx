import { styled } from "styled-components";
import ProfileHeader from "../component/user/ProfileHeader"
import SideBar from "../component/SideBar";


const ProfileContainer = styled.div`
  display: flex;
`

function Profile() {
  return (
    <ProfileContainer>
      <SideBar/>
      <ProfileHeader/>
    </ProfileContainer>
  );
}

export default Profile;