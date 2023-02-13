import axios from "axios";
import UserModel from "../Models/user-model";
import VacationModel from "../Models/vacation-model";
import { vacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class UserVacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationStore.getState().vacations;
        console.log("a");

        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.UserVacationsUrl);
            console.log("b");
            const vacations = response.data;
    
            vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations });
        }
        console.log(vacations);
        return vacations;
    }
}

const userVacationService = new UserVacationService();

export default userVacationService;