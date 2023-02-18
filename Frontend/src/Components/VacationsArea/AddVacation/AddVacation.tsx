import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import adminVacationService from "../../../Services/AdminVacationService";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {


    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());


    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminVacationService.addVacation(vacation);
            notify.success("Vacation has been added");
            navigate("/vacations");
        }
        catch (err) {
            notify.error(err);
        }
    }


    // validate start date must be before end date
    const validateEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };


    return (
        <div className="AddVacation">


            <form onSubmit={handleSubmit(send)}>
                <h2>Add vacation</h2>

                <label>Destination</label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)}></input>
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description:</label>
                <textarea {...register("description", VacationModel.descriptionValidation)}></textarea>
                <span className="Err">{formState.errors.description?.message}</span>
                <br />
                <label>Price</label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)}></input>
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Start Date</label>
                <input type="date" min={new Date().toISOString().substring(0, 10)} onChange={validateEndDate} {...register("startDate")} required />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End Date</label>
                <input type="date" min={startDate.toISOString().substring(0, 10)} {...register("endDate")} required />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Image</label>
                <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)}></input>
                <span className="Err">{formState.errors.image?.message}</span>

                <button>Send</button>

            </form>

        </div>
    );
}

export default AddVacation;
