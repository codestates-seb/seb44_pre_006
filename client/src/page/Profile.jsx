import { styled } from "styled-components";
import ProfileHeader from "../component/user/ProfileHeader"
import SideBar from "../component/SideBar";
import ProfileCartegory from "../component/user/ProfileCategory"
import {DataFilterWrapper, NewestButton, UnansweredButton} from "./AllQuestion"
import fetchGetUserQnA from "../api/getUserQnA"
import { useEffect , useState} from "react";
import { useDispatch } from "react-redux";
import displayCreatedAt from '../utils/displayCreateAt';
import { useNavigate } from "react-router-dom";

const ProfilePageContainer = styled.div`
  display: flex;
`
const ProfileContainer = styled.div`
  width: 75%;
  margin: 2%;
`
const StatsContainer = styled.section`
  width: 30%;
  margin-left: 2%;
  > h2 {
  }
  > .StatsBox{
    border: 2px solid var(--silver);
    border-radius: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    > .column {
      display: flex;
      flex-grow: 1;
      > .stat {
        margin: 0 5%;
        width: 40%;
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
  margin-left: 2%;  
  height: 400px;
  width: 48%;
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
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const memberId = path.slice(path.lastIndexOf("/") + 1);
  const [QnA, setQnA] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchGetUserQnA(memberId)).then(data => setQnA(data.payload.data));
    console.log(QnA)
  },[dispatch])

  return (
    <ProfilePageContainer>
      <SideBar/>
      <ProfileContainer>
        <ProfileHeader/>
        <ProfileCartegory text={`Profile`}/>
        <StatsContainer>
          <h2>Stats</h2>
            {QnA
            ? (  <div className="StatsBox">
            <div className="column">
              <div className="stat">
                <p>{QnA.questions.length}</p>
                <p>questions</p>
              </div>
              <div className="stat">
              <p>{QnA.answers.length}</p>
                <p>answers</p>
              </div>
             </div>
            </div>)
            : null}
          
          
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
          {QnA ? (
            QnA.questions.slice(0, 5).map(el => (
              <div className="ActivityItem">
                <p className="view">{el.viewCount}</p>
                <p className="title" onClick={()=> navigate(`/question/${el.id}`)}>{el.title}</p>
                <p className="createdAt">{displayCreatedAt(el.createdAt)}</p>
              </div>
            ))
          ) : null}
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
          {QnA ? (
            QnA.answers.slice(0, 5).map(el => (
              <div className="ActivityItem">
                <p className="view">0</p>
                <p className="title">{el.content}</p>
                <p className="createdAt">{displayCreatedAt(el.createdAt)}</p>
              </div>
            ))
          ) : null}
          </div>
        </ActivityContainer>
        </FlexDiv>
      </ProfileContainer>
    </ProfilePageContainer>
  );
}

export default Profile;