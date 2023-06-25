import { styled } from "styled-components";
import ProfileHeader from "../component/user/ProfileHeader"
import SideBar from "../component/SideBar";
import ProfileCartegory from "../component/user/ProfileCategory"

const ProfilePageContainer = styled.div`
  display: flex;
`
const ProfileContainer = styled.div`
  width: 100%;
  margin: 30px;
  border: 1px solid;
`

function Profile() {
  return (
    <ProfilePageContainer>
      <SideBar/>
      <ProfileContainer>
        <ProfileHeader/>
        <ProfileCartegory text={`Profile`}/>
      </ProfileContainer>
    </ProfilePageContainer>
  );
}

export default Profile;