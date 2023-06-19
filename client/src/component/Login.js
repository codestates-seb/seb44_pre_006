import { styled } from "styled-components";
import logoIcon from '../asset/logo-icon.png'
import { Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";

function Login () {
    const LoginContainer = styled.section`
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
    const LoginForm = styled.div`
        height: 250px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        border: 1px solid #B1B1B1;
        > button {
            width: 300px;
            height: 40px;
            background-color: #0A95FF;
            color: white;
            font-size: 100%;
            border: 1px solid #B1B1B1;
            border-radius: 5px;
        }
    `
    const LoginInputForm = styled.div`
        display: flex;
        flex-direction: column;
        > input {
            width: 300px;
            height: 40px;
            border-radius: 5px;
            border: 1px solid #B1B1B1;
        }
        > h3 {
            margin: 0;
        }
    `

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