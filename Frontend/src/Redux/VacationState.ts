
import VacationModel from "../Models/vacation-model";
import { createStore } from "redux";

//1.App state
export class VacationState {
    public vacations: VacationModel[] = [];
}

//2. Action type
export enum vacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    FollowVacation = "FollowVacation",
    UnFollowVacation = "UnFollowVacation",
    DeleteAll = "DeleteAll"
}

//3. Action - a single describing single operation on data:
export interface vacationsAction {
    type: vacationsActionType,
    payload: any;
}

//4.Reducer - function preforming the needed actions:
export function vacationsReducer(currentState = new VacationState(), action: vacationsAction): VacationState {

    const newState = { ...currentState };

    switch (action.type) {
        case vacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;
        case vacationsActionType.AddVacation:
            newState.vacations.push(action.payload);
            break;

        case vacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case vacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if(indexToDelete >= 0){
                newState.vacations.splice(indexToDelete ,1)
            }
            break;

            case vacationsActionType.FollowVacation:
                const indexToFollow = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
                if(indexToFollow >= 0){
                    newState.vacations[indexToFollow] = action.payload;
                }
                break;

            case vacationsActionType.UnFollowVacation:
                const indexToUnFollow = newState.vacations.findIndex(v=>v.vacationId === action.payload);
                if(indexToUnFollow >= 0 ){
                    newState.vacations.splice(indexToUnFollow ,1)
                }
                break;

                case vacationsActionType.DeleteAll:
                    newState.vacations = []; 

            }
    return newState;
}


//5.Store - Redux manager
export const vacationStore = createStore(vacationsReducer);
