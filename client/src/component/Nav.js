import { styled } from "styled-components";
import SOF from "../asset/SOF_Logo.png"
import UserNull from "../asset/User_null.png"

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
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.4444 20.7998L11.4444 13.7998C10.8889 14.2442 10.25 14.5961 9.52778 14.8554C8.80556 15.1146 8.03704 15.2442 7.22222 15.2442C5.2037 15.2442 3.49556 14.545 2.09778 13.1465C0.7 11.748 0.000740741 10.0398 0 8.02203C0 6.00351 0.699259 4.29536 2.09778 2.89758C3.4963 1.4998 5.20444 0.800545 7.22222 0.799805C9.24074 0.799805 10.9489 1.49906 12.3467 2.89758C13.7444 4.2961 14.4437 6.00425 14.4444 8.02203C14.4444 8.83684 14.3148 9.60536 14.0556 10.3276C13.7963 11.0498 13.4444 11.6887 13 12.2443L20 19.2443L18.4444 20.7998ZM7.22222 13.022C8.61111 13.022 9.79185 12.5357 10.7644 11.5631C11.737 10.5905 12.223 9.41018 12.2222 8.02203C12.2222 6.63314 11.7359 5.4524 10.7633 4.4798C9.79074 3.50721 8.61037 3.02129 7.22222 3.02203C5.83333 3.02203 4.65259 3.50832 3.68 4.48092C2.70741 5.45351 2.22148 6.63388 2.22222 8.02203C2.22222 9.41092 2.70852 10.5917 3.68111 11.5642C4.6537 12.5368 5.83407 13.0228 7.22222 13.022Z" fill="#9A9A9A"/>
                </svg>
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
  
