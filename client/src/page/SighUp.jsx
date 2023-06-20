import SignUpCompo from "../component/SighUp";
import SideBar from "../component/SideBar";
import { styled } from "styled-components";

const SighUpContainer = styled.div`
  display: flex;
`
const SighUpBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const TextContent = styled.section`
 
`

function SignUp() {
  return (
    <SighUpContainer>
      <SideBar/>
      <SighUpBox>
      <TextContent>
        <h1>Join the Stack Overflow community</h1>
        <p>Get unstuck — ask a question</p>
        <p>Unlock new privileges like voting and commenting</p>
        <p>Save your favorite questions, answers, watch tags, and more</p>
        <p>Earn reputation and badges</p>
      </TextContent>
       <SignUpCompo/>
      </SighUpBox>
    </SighUpContainer>
  );
}

export default SignUp;