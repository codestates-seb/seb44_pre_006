import { Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { 
    LoginContainer as SighUpContaner, 
    LoginForm as SighUpForm, 
    LoginInputForm as SighUpInPutForm} from "./Login";

function SignUp() {
    return(
        <SighUpContaner>
            <GoogleButton/>
            <SighUpForm>
                <SighUpInPutForm className="LoginInputForm">
                <h3>Display name</h3>
                <input/>
                </SighUpInPutForm>
                <SighUpInPutForm className="LoginInputForm">
                <h3>Email</h3>
                <input/>
                </SighUpInPutForm>
                <SighUpInPutForm className="LoginInputForm">
                <h3>Password</h3>
                <input/>
                </SighUpInPutForm>
                <button>Sigh Up</button>
            </SighUpForm>
            <p>
            Already have an account? &nbsp; 
            <Link to='/users/login'>Log in</Link>
        </p>
        </SighUpContaner>
    )
}

export default SignUp;