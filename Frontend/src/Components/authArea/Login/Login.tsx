import { useForm } from "react-hook-form";
import RestoreIcon from '@mui/icons-material/Restore';
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/credentials-model";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Login.css";
import { BottomNavigationAction } from "@mui/material";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.Login(credentials);
            notify.success("Welcome back!");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <h2>Login </h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="email" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button className="loginBtn">Log in</button>
<br/>


                <NavLink to="/home">
                    <button className="backBtn">back</button>
                </NavLink>
            </form>

        </div>
    );
}

export default Login;
