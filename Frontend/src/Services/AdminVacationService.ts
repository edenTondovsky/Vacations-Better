import axios from "axios";
import VacationModel from "../Models/vacation-model";
import { vacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class AdminVacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationStore.getState().vacations;
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.AdminVacationsUrl);
            vacations = response.data;
            vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations })
        }
        return vacations
    }

    public async addVacation(vacation: VacationModel): Promise < void > {
    const headers = { "Content-type": "multipart/form-data" }; // Tell axios that we sending text and file to backend
    const response = await axios.post<VacationModel>(appConfig.AdminVacationsUrl, vacation, { headers });
    const addedVacation = response.data;
    return this.getAllVacationsAndUpdateRedux();
}


    public async updateVacation(vacation: VacationModel): Promise < void > {
    const headers = { "Content-type": "multipart/form-data" }; // Te;; axios that we sending text and file to backend
    const response = await axios.put<VacationModel>(appConfig.AdminVacationsUrl + vacation.vacationId, vacation, { headers });
    const updatedVacation = response.data;
    return this.getAllVacationsAndUpdateRedux();
}

    public async getOneVacation(vacationId: number): Promise < VacationModel > {
    const response = await axios.get<VacationModel>(appConfig.AdminVacationsUrl + vacationId);
    const vacation = response.data;
    return vacation;

}

public async getAllVacationsAndUpdateRedux():Promise<void> {
    const response = await axios.get<VacationModel[]>(appConfig.AdminVacationsUrl);
    let vacations = response.data;
    vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations });
}

}

const adminVacationService = new AdminVacationService();

export default adminVacationService;