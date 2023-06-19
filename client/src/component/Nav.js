import { styled } from "styled-components";
import SOF from "../asset/SOF_Logo.png"
import UserNull from "../asset/User_null.png"
import sreachLogo from "../asset/sreach_logo.svg"

const NavContainer = styled.header`
    width: 100%;
    height: 50px;
    border: 1px solid #CCCCCC;
    background-color: #F8F9F9;
    display: flex ;
    align-items: center;
`
const LogoImag = styled.img`
    width: 150px;
    margin-left: 200px;
`
const NavLink = styled.div`
    color: #656565;
    margin-left: 50px;
`
const NavSreachBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #CCCCCC;
    height: 70%;
    width: 600px;
    margin-left: 50px;
    > button {
        background: none;
        border: none;
    }
    > input {
        flex-grow: 1;
        border: none;
        outline: none;
        font-size: 110%;
    }
`

const NavLogBtn = styled.button`
    height: 70%;
    border: 1px solid #CCCCCC;
    background-color: ${props => props.backgroundColor};
    margin-left: 20px;
`
const NavUserLink = styled.img`
    height: 70%;
    border: 1px solid #CCCCCC;
    border: none;
    margin-left: 20px;
`
function Nav() {
    //임시? jwt토큰 유무 판단용 변수
    let jwt = true

    return (
      <NavContainer>
        <LogoImag src={SOF}/>
        <NavLink>About</NavLink>
        <NavSreachBar>
            <button>
                <img src={sreachLogo} alt='sreachLogo'/>
            </button>
            <input placeholder="Search..."/>
        </NavSreachBar>
        {jwt  //jwt토큰 유무에 따른 분기.
        ? (
        <>
            <NavLogBtn backgroundColor="#E1ECF4">Log in</NavLogBtn>
            <NavLogBtn backgroundColor="#0A95FF">Sign up</NavLogBtn>
        </>)
        : (
        <>  
            <NavUserLink src={UserNull}></NavUserLink>
            <NavLogBtn backgroundColor="#EA1E1E">Log out</NavLogBtn>
        </>    
        )}
      </NavContainer>
    )
  }
  
  export default Nav;
  
