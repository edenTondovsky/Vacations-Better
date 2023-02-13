import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import "./VacationsCard.css";

interface VacationsCardProps {
    vacation: VacationModel;
}


function VacationsCard(props: VacationsCardProps): JSX.Element {
    console.log(props.vacation.imageName);
    
    return (
        <div className="VacationsCard Box">

            <div>
                Destination: {props.vacation.destination} <br></br>
                Description: {props.vacation.description} <br></br>
                price: {props.vacation.price}$ <br></br>
                startDate: {props.vacation.startDate} <br></br>
                endDate: {props.vacation.endDate} <br></br>
                
                <div>
                    <img src={props.vacation.imageName} />            </div>
            </div>



            <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>Edit</NavLink>



        </div>
    );
}

export default VacationsCard;
