import React from "react";
import { useNavigate } from "react-router";

const Signin = () => {
    let navigate = useNavigate();

    const SignIn = (e) => {
        e.preventDefault();
        navigate("/dashboard");
        console.log("test");
    };

    return (
        <>
            <div className="signin">
                <form className="signin-form" onSubmit={SignIn}>
                    <span className="signin-header">Sign In</span>
                    <div className="signin-username">
                        <span>Phone Number</span>
                        <input type="text" required />
                    </div>
                    <div className="signin-password">
                        <span>Password</span>
                        <input type="password" name="" id="" required />
                    </div>
                    <input type="button" value="forgot?" />
                    <input type="submit" value="sign in" />
                </form>
            </div>
        </>
    );
};

export default Signin;
