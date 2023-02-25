import VacationModel from "../../../Models/vacation-model";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./VacationsList.css";

function VacationsList({ vacations }: { vacations: VacationModel[] }): JSX.Element {

    return (
        <div className="VacationsList">
            {vacations.map(v => <VacationsCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}



export default VacationsList;
