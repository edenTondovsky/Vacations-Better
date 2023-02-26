import axios from "axios";
import { report } from "process";
import ReportModel from "../Models/report-model";
import VacationModel from "../Models/vacation-model";
import { vacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class AdminVacationService {


    //Get all vacations for Admin
    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationStore.getState().vacations;
        //check if there is vacations or get from server 
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.AdminVacationsUrl);
            vacations = response.data;
            vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations })
        }
        return vacations
    }

    //Get one vacation (using for update vacation)
    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.AdminVacationsUrl + vacationId);
        const vacation = response.data;
        return vacation;
    }

    //Add vacation and update redux
    public async addVacation(vacation: VacationModel): Promise<void> {
            const headers = { "Content-type": "multipart/form-data" }; // Tell axios that we sending text and file to backend
            const response = await axios.post<VacationModel>(appConfig.AdminVacationsUrl, vacation, { headers });
            const addedVacation = response.data;
            vacationStore.dispatch({ type: vacationsActionType.AddVacation, payload: addedVacation });
        
        return this.getAllVacationsAndUpdateRedux();
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-type": "multipart/form-data" }; // Tell axios that we sending text and file to backend
        const response = await axios.put<VacationModel>(appConfig.AdminVacationsUrl + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;
        vacationStore.dispatch({ type: vacationsActionType.UpdateVacation, payload: updatedVacation });
        return this.getAllVacationsAndUpdateRedux();
    }
    
    //Delete vacation:
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.AdminVacationsUrl + vacationId);
        vacationStore.dispatch({ type: vacationsActionType.DeleteVacation, payload: vacationId });
        return this.getAllVacationsAndUpdateRedux();
    }

    //function for get all vacation after change like add/update:
    public async getAllVacationsAndUpdateRedux(): Promise<void> {
        const response = await axios.get<VacationModel[]>(appConfig.AdminVacationsUrl);
        let vacations = response.data;
        vacationStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations });
    }

    //Get followers reports
    async getReport(): Promise<ReportModel[]> {
        const response = await axios.get<ReportModel[]>(appConfig.AdminVacationsReportUrl);
        const report = response.data;
        return report;
    }

}

const adminVacationService = new AdminVacationService();

export default adminVacationService;