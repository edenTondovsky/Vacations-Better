import { BottomNavigationAction, Button } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import adminVacationService from "../../../Services/AdminVacationService";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [vacation, setVacation] = useState<VacationModel>();
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        adminVacationService.getOneVacation(+params.vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("price", vacation.price);
                ///
                const startDate = new Date(vacation.startDate);
                startDate.setDate(startDate.getDate() + 1);
                const dateForSetValue = startDate.toISOString().substring(0, 10);
                setValue("startDate", dateForSetValue);
                ///
                const endDate = new Date(vacation.startDate);
                endDate.setDate(startDate.getDate() + 1);
                const endDateForSetValue = startDate.toISOString().substring(0, 10);
                setValue("endDate", endDateForSetValue);
                setValue("image", vacation.image);
                setVacation(vacation);
            })
            .catch(err => notify.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            const err = validateDate(vacation.startDate, vacation.endDate);
            if (err) {
                notify.error(err)
                return;
            }
            else {
                vacation.image = (vacation.image as unknown as FileList)[0];
                await adminVacationService.updateVacation(vacation);
                notify.success("Vacation has been update");
                navigate("/vacations");
            }
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    const validateDate = (startDate: string, endDate: string) => {
        if (new Date(endDate) < new Date(startDate)) {
            return "End time cannot be before start time.";
        }
        return "";
    }

    // validate start date must be before end date
    const validateEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };

    return (
        <div className="EditVacation">

            <form onSubmit={handleSubmit(send)}>

                <h2> Edit Vacation </h2>
                {/* hiding the id in the form  */}
                <input type="hidden" {...register("vacationId")} />

                <label>Destination</label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)}></input>
                <span className="Err">{formState.errors.destination?.message}</span>
                <br />
                <label>Description:</label>
                <textarea {...register("description", VacationModel.descriptionValidation)}></textarea>
                <span className="Err">{formState.errors.description?.message}</span>
                <br />
                <label>Price</label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)}></input>
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Start Date</label>
                <input type="date" min={new Date().toISOString().substring(0, 10)}  {...register("startDate", VacationModel.startDateValidation)} onChange={validateEndDate} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End Date</label>
                <input type="date" min={startDate.toISOString().substring(0, 10)} {...register("endDate", VacationModel.endDateValidation)}  />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Image</label>
                <input type="file" accept="image/*" {...register("image")}></input>
                <span className="Err">{formState.errors.image?.message}</span>


                <img src={vacation?.imageName}/>


                <NavLink to="/vacations">
                    <BottomNavigationAction label="Back" icon={<RestoreIcon />} />
                </NavLink>

                <button>Edit Vacation</button>
            </form>
        </div>
    );
}

export default EditVacation;
