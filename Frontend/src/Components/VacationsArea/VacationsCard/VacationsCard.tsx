import { ChangeEvent, useEffect, useState } from "react";
import { ChangeHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import userVacationService from "../../../Services/UserVacationService ";
import "./VacationsCard.css";

interface VacationsCardProps {
    vacation: VacationModel;
}


function VacationsCard(props: VacationsCardProps): JSX.Element {

    //get user state to check each user components
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
    }, []);

    function handleFollowChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            userVacationService.follow(props.vacation.vacationId);
        }
        else {
            userVacationService.unfollow(props.vacation.vacationId);
        }
    }

    let isVacationFollowed = false;
    if(props.vacation.isFollowing){
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
                    <img src={props.vacation.imageName} />            </div>
            </div>


            {user?.role === "Admin" && <div className="addLink">
                <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>Edit</NavLink>
                <br />
            </div>}
      
            { user?.role === "User" && <div className="followDiv">
                <input type="checkbox" onChange={handleFollowChange} defaultChecked={isVacationFollowed} />
                {props.vacation.followersCount}
            </div>
            }

        </div>
    );
}



export default VacationsCard;
