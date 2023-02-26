import RoleModel from "./role-model";
import { RegisterOptions } from "react-hook-form";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;
    
    public static firstNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing first name"},
        minLength: { value: 2, message: "First name must be minimum 2 chars"},
        maxLength: { value: 20, message: "First name can't exceeds 50 chars"}
    };
        
    public static lastNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing last name"},
        minLength: { value: 4, message: "Last name must be minimum 4 chars"},
        maxLength: { value: 30, message: " Last name can't exceeds 30 chars"}
    };
    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing Email"},
        minLength: { value: 2, message: "Email must be minimum 2 chars"},
        maxLength: { value: 50, message: "Email can't exceeds 50 chars"}
    };
    
    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password"},
        minLength: { value: 4, message: "password must be minimum 4 chars"},
        maxLength: { value: 30, message: " password can't exceeds 30 chars"}
    };
}

export default UserModel;