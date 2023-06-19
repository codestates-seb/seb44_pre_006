import { styled } from "styled-components";
import logoIcon from '../asset/logo-icon.png'
import { Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import '../Global.css';

export const LoginContainer = styled.section`
width: 400px;
height: 500px;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
> img {
    width: 40px
}
`
export const LoginForm = styled.div`
height: auto;
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
border-radius: 5px;
border: 1px solid var(--silver-lighter);
> button {
    width: 300px;
    height: 40px;
    background-color: var(--blue-500);
    color: white;
    font-size: 100%;
    border: 1px solid var(--silver-lighter);
    border-radius: 5px;
    margin-top: 20px;
}
`
export const LoginInputForm = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
> input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid var(--silver-lighter);
}
> h3 {
    margin: 0;
}
`

function Login () {
    return(
        <LoginContainer className="LoginContainer">
            <img src={logoIcon} alt='logoIcon'/>
            <GoogleButton/>
            <LoginForm>
                <LoginInputForm className="LoginInputForm">
                    <h3>Email</h3>
                    <input/>
                </LoginInputForm>
                <LoginInputForm className="LoginInputForm">
                    <h3>Password</h3>
                    <input/>
                </LoginInputForm>
                <button>Log in</button>
            </LoginForm>
            <p>
                Don’t have an account? &nbsp; 
                <Link to='/users/signup'>Sign up</Link>
            </p>
        </LoginContainer>
    )
}

export default Login;
