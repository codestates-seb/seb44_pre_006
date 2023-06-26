import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import userNull from "../asset/User_null.png"
import displayCreatedAt from '../utils/displayCreateAt';
import { useSelector } from "react-redux";

const ContentsContainer = styled.section`
    width: 70vw;
    padding: 30px;
    border-bottom: 1px solid var(--silver-darker);
`
const TextField = styled.div`
    
`
const TagField = styled.div`
`
const UserField = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    > .editBtn {
        margin: 0;
        color: var(--silver-darker)
    }
`
const UserBox = styled.div`
    width: 200px;
    height: 70px;
    background-color: var(--powder-100);
    padding: 5px 7px; 
    display: flex;
    flex-direction: column;
    > .askDate {
        margin: 0 0 3px 0;
        color: var(--silver-darker);
        font-size: small;
    }
    > .userInfo {
        flex-grow: 1;
        display: flex;
        align-items: start;
        >img{
            position: relative;
            width: 40px;
            height: auto;
            margin: px;
        }
        >p{
            margin: 0 0 0 10px;
            color: var(--blue-600);
        }
    }
`
function AnswerBox({answer}) {

    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    return(
        <ContentsContainer>
            <TextField>
            {answer.content}
            </TextField>
            <TagField>
                {/* 태그 필드 */}
            </TagField> 
            <UserField>
                {answer.createdBy === user.data.name || user.data.admin
                ? <p className="editBtn" onClick={() => navigate(`/answer/edit/${answer.answerId}`)}>Edit</p>
                : <p></p> }
                <UserBox className="userBox">
                    <p className="askDate">answered {displayCreatedAt(answer.createdAt)}</p>
                    <div className="userInfo">
                        <img src={userNull} alt='userNull'/>
                        <p>{answer.createdBy}</p>
                    </div>
                </UserBox>
            </UserField>
        </ContentsContainer>
    )
}

export default AnswerBox;