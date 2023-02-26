import { Button } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import "./Home.css";

function Home(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    return (
        <div className="Home">

            {!user && <>

                <h2>For using  our website please Register 😉</h2>

                <div className="registerFirstDiv">
                    <NavLink to="/register">
                        <button className="registerBtn">Register</button>
                    </NavLink>
                    <br />
                </div>

                <div className="alreadyRegisterDiv">
                    <span>registered user ?</span>
                    <br/>
                    <NavLink to="/login">
                        <button className="loginBtn" >Login</button>
                    </NavLink>
                </div>

            </>}        </div>
    );
}

export default Home;
