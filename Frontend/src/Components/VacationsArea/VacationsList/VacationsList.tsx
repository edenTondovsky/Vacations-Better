import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./VacationsList.css";

function VacationsList({vacations}:{vacations:VacationModel[]}): JSX.Element {

    return (
        <div className="VacationsList">
            {vacations.map(v => <VacationsCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}



export default VacationsList;
