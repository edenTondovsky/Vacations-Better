import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";
import { Pagination } from "@mui/material";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationsCard from "../../VacationsArea/VacationsCard/VacationsCard";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user);
        //listen to authState changes:
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
            navigate("/vacations");
        })
    }, []);

    function logout() {
        authService.logout();
    }

    return (
        <div className="AuthMenu">
            {user && <>
                <span className="userName"> {user.firstName} {user.lastName}</span>
                
                <div className="logout">
                    <br />
                    <NavLink to="/home" className='logout'  onClick={logout}>Logout</NavLink>
                </div>
            </>}
        </div>
    );
}

export default AuthMenu;
