import { styled } from "styled-components";
import userNull  from "../../asset/User_null.png"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProfileContainer = styled.section`
    display: flex;
    height: 20vh;
    width: 100%;
    justify-content: space-between;
    
    > .leftDiv {
        display: flex;
        height: 100%;
        align-items: center;
        >img{
            height: 100%;
            border-radius: 20px;
        }
        > .userInfo {
            margin-left: 20px;
            & > :first-child {
                margin: 0;
                font-size: 200%;
                color: var(--black);
            }
            & > :last-child {
                margin: 0;
                color: var(--silver-darker);
        }
         }
    }

    > .rightDiv {
        display: flex;
        align-items: start;
        height: 100%;
        >button{
            padding: 10px;
            margin-left: 20px;
            color: var(--white);
            border-radius: 5px;
        }
    }
`

export default function ProfileHeader(){
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const path = window.location.pathname;
    const memberId = path.slice(path.lastIndexOf("/") + 1);

    return(
        <>
        <ProfileContainer>
            <div className="leftDiv">
                <img src={userNull} alt="userNull"/>
                <div className="userInfo">
                    <p>{user.data.name}</p>
                    <p>{user.data.email}</p>
                </div>
            </div>
            <div className="rightDiv">
                {user.data.memberId == memberId || user.data.admin
                ? <>
                    <button style={{ backgroundColor: 'var(--blue-500)' }}  onClick={()=>navigate(`/user/edit/${user.data.memberId}`)}>Edit Profile</button>
                    <button style={{ backgroundColor: 'var(--red-400)' }}  onClick={()=>navigate(`/user/delete/${user.data.memberId}`)}>Delete Profile</button>
                </>
                :<></>}
                
            </div>
        </ProfileContainer>
        </>
    )
}