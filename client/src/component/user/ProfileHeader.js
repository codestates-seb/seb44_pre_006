import { styled } from "styled-components";
import userNull  from "../../asset/User_null.png"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProfileContainer = styled.section`
    display: flex;
    height: 12vh;
    width: 100%;
    justify-content: space-between;
    
    > .leftDiv {
        display: flex;
        height: 100%;
        align-items: center;
        >img{
            height: 100%;
        }
        > p {
            margin-left: 20px;
            font-size: 200%;
         }
    }

    > .rightDiv {
        display: flex;
        align-items: start;
        height: 100%;
        >button{
            padding: 10px;
            margin-right: 20px;
            background-color: ${(props) => props.backgroundColor};
            border-radius: 5px;
        }
    }
`

export default function ProfileHeader(){
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    return(
        <>
        <ProfileContainer>
            <div className="leftDiv">
                <img src={userNull} alt="userNull"/>
                <p>{user.data.name}</p>
            </div>
            <div className="rightDiv">
                <button backgroundColor='' onClick={()=>navigate('user/edit')}>Edit Profile</button>
                <button backgroundColor='' onClick={()=>navigate('user/delete')}>Delete Profile</button>
            </div>
        </ProfileContainer>
        </>
    )
}