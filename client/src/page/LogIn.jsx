import Login from "../component/Login";
import SideBar from "../component/SideBar";
import { styled } from "styled-components";

const LoginContainer = styled.div`
  display: flex;
`
const LoginBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
function LogIn() {
  return (
    <LoginContainer className="LoginContainer">
      <SideBar/>
      <LoginBox className="LoginBox">
        <Login/>
      </LoginBox>
    </LoginContainer>
  );
}

export default LogIn;