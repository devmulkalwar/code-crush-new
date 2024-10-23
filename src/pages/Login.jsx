import React from "react";
import GoogleButton from "react-google-button";
import "../assets/style/login.css";
import { login } from "../database/auth.db";
import { useGlobalContext } from "../context/Context";

const Login = () => {
    const { handleLogin } = useGlobalContext();
    

    return (
        <div className="login">
            <span className="login-heading">Sign in with Google</span>
            <div className="login-button">
                <GoogleButton onClick={handleLogin} />
            </div>
        </div>
    );
};

export default Login;
