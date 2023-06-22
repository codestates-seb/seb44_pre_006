import { styled } from "styled-components";
import SOF from "../asset/SOF_Logo.png"
import UserNull from "../asset/User_null.png"
import sreachLogo from "../asset/sreach_logo.svg"
import '../Global.css';
import { useNavigate } from "react-router-dom";

const NavContainer = styled.header`
    width: 100%;
    height: 50px;
    border: 1px solid var(--silver);
    border-top: 3px solid var(--orange);
    background-color: var(--white);
    display: flex ;
    align-items: center;
    position: fixed;
    z-index: 100;
`
const LogoImag = styled.img`
    width: 150px;
    margin-left: 100px;
`
const NavLink = styled.div`
    color: var(--black-500);
    margin-left: 30px;
`
const NavSreachBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid var(--silver);
    height: 70%;
    width: 700px;
    margin-left: 30px;
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
    border: 1px solid var(--silver);
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    margin-left: 10px;
    border-radius: 10%;
    padding: 0px 10px;
`
const NavUserLink = styled.img`
    height: 70%;
    border: 1px solid var(--silver);
    border: none;
    margin-left: 10px;
`

function Nav() {
    //임시? jwt토큰 유무 판단용 변수
    let jwt = true
    const navigate = useNavigate()

    return (
      <NavContainer>
        <LogoImag src={SOF} onClick={()=>{navigate('/')}}/>
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
            <NavLogBtn backgroundColor="var(--powder-200)" color="var(--powder-700)" onClick={()=>{navigate('/users/login')}}>
                Log in
            </NavLogBtn>
            <NavLogBtn backgroundColor="var(--blue-500)" color="var(--blue-050)" onClick={()=>{navigate('/users/sighup')}}>
                Sign up
            </NavLogBtn>
        </>)
        : (
        <>  
            <NavUserLink src={UserNull}></NavUserLink>
            <NavLogBtn backgroundColor="var(--red-400)" color="var(--red-050)">Log out</NavLogBtn>
        </>    
        )}
      </NavContainer>
    )
  }
  
  export default Nav;
  
