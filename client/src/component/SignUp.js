import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from './GoogleButton';
import {
  LoginContainer as SignUpContainer,
  LoginForm as SignUpForm,
  LoginInputForm as SignUpInputForm,
} from './Login';
import { useRef } from 'react';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSignUpHandler = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await axios
      .post('/users/signup', { email: email, password: password, name: name })
      .then(response => {
        console.log(response);
        navigate('/user/login');
      })
      .catch(err => {
        console.log(err);
      });
    // navigate()를 사용하여 다른 페이지로 이동 가능
  };

  return (
    <SignUpContainer>
      <GoogleButton />
      <SignUpForm>
        <SignUpInputForm className="LoginInputForm">
          <h3>Display name</h3>
          <input ref={nameRef} id="nameRef" />
        </SignUpInputForm>
        <SignUpInputForm className="LoginInputForm">
          <h3>Email</h3>
          <input ref={emailRef} id="emailRef" />
        </SignUpInputForm>
        <SignUpInputForm className="LoginInputForm">
          <h3>Password</h3>
          <input ref={passwordRef} id="passwordRef" />
        </SignUpInputForm>
        <button onClick={onSignUpHandler}>Sign Up</button>
      </SignUpForm>
      <p>
        Already have an account? <Link to="/users/login">Log in</Link>
      </p>
    </SignUpContainer>
  );
}

export default SignUp;
