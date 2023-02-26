import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string
    public password: string;

    public constructor(user: CredentialsModel) {

        this.email = user.email
        this.password = user.password;
    }

    //validation
    private static ValidationSchema = Joi.object({
        email: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(4).max(256),
        
    });

    //Function for use validate
    public validateCredentials(): void {
        const result = CredentialsModel.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;