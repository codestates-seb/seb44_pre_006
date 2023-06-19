import { useEffect } from "react";

function GoogleButton() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
    },[])
    
    const pathname = window.location.pathname
    const dataClientId = ''
    const dataLoginId = ''

    return(
        <div className="GoogleButton">
            {(pathname === "/users/login") 
            ? (<> 
            <div id="g_id_onload"
                data-client_id={dataClientId}
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri={dataLoginId}
                data-auto_select="true"
                data-itp_support="true">
            </div>
            <div class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-locale="en-GB"
                data-logo_alignment="center"
                data-width="310">
            </div>
            </>)
            : (<>
            <div id="g_id_onload"
                data-client_id={dataClientId}
                data-context="signup"
                data-ux_mode="popup"
                data-login_uri={dataLoginId}
                data-auto_select="true"
                data-itp_support="true">
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signup_with"
                data-size="large"
                data-locale="en-GB"
                data-logo_alignment="center"
                data-width="310">
            </div>
            </>)}
        </div>
    )   
}

export default GoogleButton