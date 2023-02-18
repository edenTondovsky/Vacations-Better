import { ChangeEvent, useEffect, useState } from "react";
import { ChangeHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import adminVacationService from "../../../Services/AdminVacationService";
import userVacationService from "../../../Services/UserVacationService ";
import notify from "../../../Utils/Notify";
import "./VacationsCard.css";

interface VacationsCardProps {
    vacation: VacationModel;
}


function VacationsCard(props: VacationsCardProps): JSX.Element {

    //get user state to check each user components
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user);
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
    }, []);


    async function deleteVacation(vacationId: number) {
        try {
            //ask window = if not return back
            const sure = window.confirm("Are you sure?");
            if (!sure) return;

            await adminVacationService.deleteVacation(vacationId);
            notify.success("Vacation has been deleted");
            navigate("/vacations");
        } catch (err: any) {
            alert(err.message);

        }

    }

    function handleFollowChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            userVacationService.follow(props.vacation.vacationId);
        }
        else {
            userVacationService.unfollow(props.vacation.vacationId);
        }
    }

    let isVacationFollowed = false;
    if (props.vacation.isFollowing) {
        isVacationFollowed = true;
    }


    return (
        <div className="VacationsCard Box">

            <div>
                Destination: {props.vacation.destination} <br></br>
                Description: {props.vacation.description} <br></br>
                price: {props.vacation.price}$ <br></br>
                startDate: {new Date(props.vacation.startDate).toLocaleDateString("HE-IL").toString()}  <br></br>
                endDate: {new Date(props.vacation.endDate).toLocaleDateString("HE-IL").toString()} <br></br>

                <div>
                    <img src={props.vacation.imageName} /> </div>
            </div>


            {user?.role === "Admin" && <div className="addVacationLink">
                <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>✏️</NavLink>
                <NavLink to="#" onClick={() => { deleteVacation(props.vacation.vacationId) }}>❌</NavLink>
                <br />
            </div>}



            {user?.role === "User" && <div className="followDiv">
                <input type="checkbox" onChange={handleFollowChange} defaultChecked={isVacationFollowed} />
                {props.vacation.followersCount}
            </div>
            }

        </div>
    );
}



export default VacationsCard;
