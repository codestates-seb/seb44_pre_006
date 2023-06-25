import SignUpCompo from "../component/SignUp";
import SideBar from "../component/SideBar";
import { styled } from "styled-components";

const SignUpContainer = styled.div`
  display: flex;
`
const SignUpBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const TextContent = styled.section`
 
`

function SignUp() {
  return (
    <SignUpContainer>
      <SideBar/>
      <SignUpBox>
      <TextContent>
        <h1>Join the Stack Overflow community</h1>
        <p>Get unstuck — ask a question</p>
        <p>Unlock new privileges like voting and commenting</p>
        <p>Save your favorite questions, answers, watch tags, and more</p>
        <p>Earn reputation and badges</p>
      </TextContent>
       <SignUpCompo/>
      </SignUpBox>
    </SignUpContainer>
  );
}

export default SignUp;