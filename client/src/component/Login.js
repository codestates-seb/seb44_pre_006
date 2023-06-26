import { styled } from "styled-components";
import logoIcon from '../asset/logo-icon.png'
import { Link , useNavigate} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { useRef } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import {fetchUser} from '../api/getUser'


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

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    

    const onLogInHandler = async () => {
        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        await axios
            .post('/users/login', {  password: password, username: name })
            .then(response => {
                console.log(response);
                localStorage.setItem("jwtToken", response.headers.authorization);
                localStorage.setItem("refreshToken", response.headers.refresh);
                dispatch(fetchUser(response.data.memberId))
                localStorage.setItem("memberId", response.data.memberId)
                navigate('/home')
            })
            .catch(err => {
                console.log(err);
            });
    }
    return(
        <LoginContainer className="LoginContainer">
            <img src={logoIcon} alt='logoIcon'/>
            <GoogleButton/>
            <LoginForm>
                <LoginInputForm className="LoginInputForm">
                    <h3>Email</h3>
                    <input ref={nameRef} id='nameRef'/>
                </LoginInputForm>
                <LoginInputForm className="LoginInputForm">
                    <h3>Password</h3>
                    <input ref={passwordRef} id="passwordRef"/>
                </LoginInputForm>
                <button onClick={() => onLogInHandler()}>Log in</button>
            </LoginForm>
            <p>
                Don’t have an account? &nbsp; 
                <Link to='/users/sighup'>Sign up</Link>
            </p>
        </LoginContainer>
    )
}

export default Login;
