import axios from "axios";
import UserModel from "../Models/user-model";
import VacationModel from "../Models/vacation-model";
import { vacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class UserVacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationStore.getState().vacations;
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.UserVacationsUrl);
            vacations = response.data;
            vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations });
        }
        return vacations;
    }

    public async follow(vacationId: number): Promise<void> {
        return axios.post(appConfig.UserFollowUrl + vacationId)
        .then(this.getAllVacationsAndUpdateRedux)
    }

    public async unfollow(vacationId: number): Promise<void> {
        return axios.delete(appConfig.UserFollowUrl + vacationId)
        .then(this.getAllVacationsAndUpdateRedux)
    }

    public async getAllVacationsAndUpdateRedux():Promise<void> {
        const response = await axios.get<VacationModel[]>(appConfig.UserVacationsUrl);
        let vacations = response.data;
        vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations });
    }
}



const userVacationService = new UserVacationService();

export default userVacationService;