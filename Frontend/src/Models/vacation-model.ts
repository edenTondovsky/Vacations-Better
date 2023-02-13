
import { RegisterOptions } from "react-hook-form";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;

    //validation for add vacation
    public static destinationValidation: RegisterOptions = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "destination must be minimum 2 chars" },
        maxLength: { value: 50, message: "destination can't exceeds 50 chars" }
    };

    public static descriptionValidation: RegisterOptions = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 2, message: "description must be minimum 2 chars" },
        maxLength: { value: 1000, message: "description can't exceeds 1000 chars" }
    };

    public static priceValidation: RegisterOptions = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price can't be negative" },
        max: { value: 20000, message: "Price can't exceeds 20000" }
    };

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" }
    };
}

export default VacationModel;