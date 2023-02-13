import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import { vacationStore } from "../../../Redux/VacationState";
import adminVacationService from "../../../Services/AdminVacationService";
import authService from "../../../Services/AuthService";
import userVacationService from "../../../Services/UserVacationService ";
import notify from "../../../Utils/Notify";
import AddVacation from "../AddVacation/AddVacation";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
        console.log(user);
    }, []);

    useEffect(() => {
        let user = authStore.getState().user

        if (user && user.role === "Admin") {
            adminVacationService.getAllVacations()
                .then(vacations => setVacations(vacations))
                .catch(err => notify.error(err));
        }
        else {
            userVacationService.getAllVacations()
                .then(vacations => setVacations(vacations))
                .catch(err => notify.error(err)); 
        }
    }, []);

    return (
        <div className="VacationsList">

            {vacations && vacations.map(v => <VacationsCard key={v.vacationId} vacation={v} />)}

            { user && user.role === "Admin" && <div className="addLink">
                <NavLink to="/vacations/new">Add vacation</NavLink>
                <br />
            </div>}

        </div>

    );
}



export default VacationsList;
