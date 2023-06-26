import styled from "styled-components";
import { useNavigate } from "react-router";

const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 700px;
  background-color: var(--black-100);
`;

const ItemContainer = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  > .textheader {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const LogoutForm = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: var(--white);
  > .topbtn {
    margin-top: 10px;
    display: flex;
    align-items: start;
    > .outbtn {
      margin: 4px;
      padding: 10px;
      border: 1px solid var(--blue-600);
      border-radius: 3px;
      color: #fff;
      background-color: var(--blue-500);
      cursor: pointer;
      &:hover {
        background-color: var(--blue-600);
      }
    }
    > .canbtn {
      margin-left: 10px;
      margin: 4px;
      padding: 10px;
      border: 1px solid var(--white);
      border-radius: 3px;
      color: var(--blue-500);
      background-color: var(--white);
      cursor: pointer;
      &:hover {
        background-color: var(--powder);
      }
    }
  }
  > p {
    margin: 10px;
    margin-bottom: 15px;
  }
`;
function LogOut() {
  const navigate = useNavigate();
  return (
    <LogoutContainer>
      <ItemContainer>
        <div className="textheader">
          Clicking "Log out" will log `you out of the following domains on this
          device:
        </div>
        <LogoutForm>
          <div className="topbtn">
            <button className="outbtn" onClick={() => navigate("/")}>
              Log out
            </button>
            <button className="canbtn" onClick={() => navigate("/home")}>
              Cancel
            </button>
          </div>
          <p>
            If you're on a shared computer, remember to log out of your Open ID
            provider (Facebook,Google,Stack Exchange,etc.) as well
          </p>
        </LogoutForm>
      </ItemContainer>
    </LogoutContainer>
  );
}

export default LogOut;
