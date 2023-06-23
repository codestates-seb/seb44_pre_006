import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import userNull from "../asset/User_null.png"

const ContentsContainer = styled.section`
    width: 70vw;
    padding: 30px;
   
    
`
const TextField = styled.div`
    
    
`
const TagField = styled.div`
`
const UserField = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

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


function AnswerBox() {


    const navigate = useNavigate();
    
    return(
        <ContentsContainer>
            <TextField>
            How can I automatically trigger an action whenever an element containing a <br/>
            specific attribute in an Ember 3.11 project is clicked?<br/>
            Currently, my structure is as follows:<br/>
            Whenever an element has the 'trackClick' attribute defined in any template, I want the '<br/>
            elementClicked' method that I've defined to be executed. I don't want to manually add <br/>
            this to each component separately.
            </TextField>
            <TagField>
                {/* 태그 필드 */}
            </TagField>
            <UserField>
                <p className="editBtn" onClick={() => navigate()}>Edit</p>
                <UserBox className="userBox">
                    <p className="askDate">asked 11 mins ago</p>
                    <div className="userInfo">
                        <img src={userNull} alt='userNull'/>
                        <p>won young</p>
                    </div>
                </UserBox>
            </UserField>
        </ContentsContainer>
    )
}

export default AnswerBox;