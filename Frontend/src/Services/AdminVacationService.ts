import axios from "axios";
import VacationModel from "../Models/vacation-model";
import { vacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class AdminVacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationStore.getState().vacations;
        console.log("before if");
        
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.AdminVacationsUrl);
            console.log("in if");
        const vacations = response.data;
        vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations })
        }
        console.log("after if");
        
        return vacations
    }
    

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        
        const headers = { "Content-type": "multipart/form-data" }; // Te;; axios that we sending text and file to backend
        const response = await axios.post<VacationModel>(appConfig.AdminVacationsUrl, vacation, { headers });
        const addedVacation = response.data;
        return addedVacation;
    }


    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const headers = { "Content-type": "multipart/form-data" }; // Te;; axios that we sending text and file to backend
        const response = await axios.put<VacationModel>(appConfig.AdminVacationsUrl + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;
        return updatedVacation;
    }


    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.AdminVacationsUrl + vacationId);
        const vacation = response.data;
        return vacation;
    }
    
}

const adminVacationService = new AdminVacationService();

export default adminVacationService;