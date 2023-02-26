import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

//validation for add vacation
private static postValidationSchema = Joi.object({
    vacationId: Joi.number().optional().integer().positive(),
    destination: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().positive().min(0).max(20000),
    imageName: Joi.string().forbidden(),
    image: Joi.object().required()
});

//validation for update vacation
private static putValidationSchema = Joi.object({
    vacationId: Joi.number().required().integer().positive(),
    destination: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().positive().min(0).max(20000),
    imageName: Joi.string().forbidden(),
    image: Joi.object().optional()
});

//Function for use POST validate
public validatePostVacation(): void {
    const result = VacationModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
}    
//Function for use UPDATE validate
public validatePutVacation(): void {
    const result = VacationModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
}    
}

export default VacationModel;