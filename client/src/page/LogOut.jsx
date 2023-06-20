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



function LogOut() {
  return (
    <div>
      <h1>LogOut</h1>
    </div>
  );
}

export default LogOut;