import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        
        //listen to authState changes:
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
    }, []);

    function logout() {
        authService.logout();
    }

    return (
        <div className="AuthMenu">
            {!user && <>

                <h2>For using website please Register </h2>
                <br />
                <NavLink to="/register">register</NavLink>
                <br />
                <br />
                <span>registered user ?</span>
                <br />
                <NavLink to="/login">login</NavLink>

            </>}

            {user && <>
                <span>Hello {user.firstName} {user.lastName}</span>
                <NavLink to="/home" onClick={logout}>Logout</NavLink>
            </>}

        </div>
    );

}

export default AuthMenu;
