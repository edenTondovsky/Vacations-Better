import { Button } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import AuthMenu from "../../authArea/AuthMenu/AuthMenu";
import "./Home.css";

function Home(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    return (
        <div className="Home">

            {!user && <>

                <h2>For using  our website please Register 😉 </h2>

                <br />

                <div className="registerFirstDiv">
                    <NavLink to="/register">
                        <Button variant="contained">Register</Button>
                    </NavLink>
                    <br />
                </div>

                <div className="alreadyRegisterDiv">
                    <span>registered user ?</span>
                    <br />
                    <br />
                    <NavLink to="/login">
                        <Button variant="contained">Login</Button>
                    </NavLink>
                </div>

            </>}        </div>
    );
}

export default Home;
