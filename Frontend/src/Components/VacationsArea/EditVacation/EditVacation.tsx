import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import adminVacationService from "../../../Services/AdminVacationService";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    // const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    

    useEffect(() => {
        adminVacationService.getOneVacation(+params.vacationId)
            .then(vacation => {                
                setValue("vacationId", vacation.vacationId);
                setValue("destination",vacation.destination );
                setValue("description", vacation.description);
                setValue("price", vacation.price);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("image", vacation.image);
                // setVacation(vacation);
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
        }}
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

    return (
        <div className="EditVacation Box">

            <h2> Edit Vacation </h2>

            <form onSubmit={handleSubmit(send)}>

                {/* hiding the id in the form  */}
                <input type="hidden" {...register("vacationId")} />

                <label>Destination</label>
                <input type="text" { ...register("destination", VacationModel.destinationValidation)}></input>
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description:</label>
                <input type="text" { ...register("description", VacationModel.descriptionValidation)}/>
                <span className="Err">{formState.errors.description?.message}</span>

                <label>Price</label>
                <input type="number" step="0.01" { ...register("price", VacationModel.priceValidation)}></input>
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Start Date</label>
                <input type="date" min={new Date().toISOString().slice(0, -8)} { ...register("startDate")} required />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End Date</label>
                <input type="date" {...register("endDate")} required />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Image</label>
                <input type="file" accept="image/*" { ...register("image", VacationModel.imageValidation)}></input>
                <span className="Err">{formState.errors.image?.message}</span>

                <button>Edit</button>

            </form>







        </div>
    );
}

export default EditVacation;
