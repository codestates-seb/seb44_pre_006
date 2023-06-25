import { styled } from "styled-components";
import ProfileHeader from "../component/user/ProfileHeader"
import SideBar from "../component/SideBar";
import ProfileCartegory from "../component/user/ProfileCategory"
import {DataFilterWrapper, NewestButton, UnansweredButton} from "./AllQuestion"

const ProfilePageContainer = styled.div`
  display: flex;
`
const ProfileContainer = styled.div`
  width: 100%;
  margin: 30px;
`
const StatsContainer = styled.section`
  width: 600px;
  margin-left: 20px;
  > h2 {
  }
  > .StatsBox{
    border: 2px solid var(--silver);
    border-radius: 20px;
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    > .column {
      display: flex;
      flex-grow: 1;
      > .stat {
        margin: 0 30px;
        margin-right: 180px;
        & > :first-child {
          font-size: 130%;
          color: var(--black);
        }
        & > :last-child {
          color: var(--silver-darker);
        }
      }
  }
  }
`
const FlexDiv = styled.div`
  display: flex;
`

const ActivityContainer = styled.section`
  margin-left: 20px;  
  height: 400px;
  width: 500px;
  display: flex;
  flex-direction: column;
  > .ActivityHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > .ActivityBox {
    border: 1px solid var(--silver);
    border-radius: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction:column;
    > .ActivityItem {
      display: flex;
      border-bottom: 0.1px solid var(--silver);
      border-radius: 10px;
      width: 100%;
      height: 20%;
      justify-content: space-around;
      align-items: center;
      > .view {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        padding: 10px;
        margin: 0 10px;
        border-radius: 5px;
        background-color: var(--green-500);
        color: var(--white);
      }
      > .title {
        flex-grow: 1;
        color: var(--blue);
        font-size: 110%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > .createdAt {
        color: var(--silver-darker);
        margin: 0 10px;
      }
    }
  }
  
`

function Profile() {
  return (
    <ProfilePageContainer>
      <SideBar/>
      <ProfileContainer>
        <ProfileHeader/>
        <ProfileCartegory text={`Profile`}/>
        <StatsContainer>
          <h2>Stats</h2>
          <div className="StatsBox">
            <div className="column">
              <div className="stat">
                <p>a</p>
                <p>questions</p>
              </div>
              <div className="stat">
                <p>a</p>
                <p>answers</p>
              </div>
            </div>
            <div className="column">
              <div className="stat">
                <p>a</p>
                <p>createdAt</p>
              </div>
              <div className="stat">
                <p>a</p>
                <p>email</p>
              </div>
            </div>
          </div>
        </StatsContainer>
        <ProfileCartegory text={`Activity`}/>
        <FlexDiv>
        <ActivityContainer>
          <div className="ActivityHeader">
            <h2>Question</h2>
            <DataFilterWrapper>
              <NewestButton>
                Newest
              </NewestButton>
              <UnansweredButton>
                Unanswered
              </UnansweredButton>
            </DataFilterWrapper>
          </div>
          <div className="ActivityBox">
            <div className="ActivityItem">
              <p className="view">View</p>
              <p className="title">titleasdasdasdsadasdasdasdadsadasdasdasdasdasd</p>
              <p className="createdAt">createdAt</p>
            </div>
          </div>
        </ActivityContainer>
        <ActivityContainer>
          <div className="ActivityHeader">
            <h2>Answer</h2>
            <DataFilterWrapper>
              <NewestButton>
                Newest
              </NewestButton>
              <UnansweredButton>
                Unanswered
              </UnansweredButton>
            </DataFilterWrapper>
          </div>
          <div className="ActivityBox">
            <div className="ActivityItem">
              <p className="view">View</p>
              <p className="title">titleasdasdasdsadasdasdasdadsadasdasdasdasdasd</p>
              <p className="createdAt">createdAt</p>
            </div>
          </div>
        </ActivityContainer>
        </FlexDiv>
      </ProfileContainer>
    </ProfilePageContainer>
  );
}

export default Profile;