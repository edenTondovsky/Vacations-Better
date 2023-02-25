import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import adminVacationService from "../../../Services/AdminVacationService";
import userVacationService from "../../../Services/UserVacationService ";
import notify from "../../../Utils/Notify";
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
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
        <div className="VacationsCard">

            <div>
                {user?.role === "Admin" && <div className="addVacationLink">
                    <div className="editAndDelete">
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>✏️</NavLink>
                        <NavLink to="#" onClick={() => { deleteVacation(props.vacation.vacationId) }}>❌</NavLink>
                    </div>
                </div>}

                {user?.role === "User" && <div className="followDiv">
                    <Checkbox onChange={handleFollowChange} defaultChecked={isVacationFollowed}
                        sx={{
                            display: 'flex', flexDirection: 'row',

                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }}
                        icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    {props.vacation.followersCount}
                    <br />
                </div>}

                <div>
                    <img className="imageCard" src={props.vacation.imageName} /> </div>
            </div>

            <div className="destinationProp">
                {props.vacation.destination} <br></br>
            </div>
            <div className="priceProp">
                {props.vacation.price}$ <br></br>
            </div>
            <div className="DateProp">
                {new Date(props.vacation.startDate).toLocaleDateString("HE-IL").toString()} ⬅️
                {new Date(props.vacation.endDate).toLocaleDateString("HE-IL").toString()} <br></br>
            </div>

            <div className="descriptionProp">
                {props.vacation.description} <br></br>
            </div>
        </div>
    );
}


export default VacationsCard;
