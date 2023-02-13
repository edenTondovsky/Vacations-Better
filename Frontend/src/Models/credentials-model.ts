import { RegisterOptions } from "react-hook-form";

class CredentialsModel {
    public email: string;
    public password: string;
    
    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email"},
        minLength: { value: 2, message: "Email must be minimum 2 chars"},
        maxLength: { value: 50, message: "Email can't exceeds 50 chars"}
    };
        
    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password"},
        minLength: { value: 4, message: "password must be minimum 4 chars"},
        maxLength: { value: 30, message: " password can't exceeds 30 chars"}
    };

}
export default CredentialsModel;
