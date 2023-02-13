import { OkPacket } from "mysql";
import appConfig from "../2-utils/appConfig";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

async function getAllVacationsForAdmin(user: UserModel): Promise<VacationModel[]> {
    const sql = "SELECT *, CONCAT( ?, imageName) AS imageUrl FROM vacations ORDER BY startDate";
    const vacations = await dal.execute(sql, appConfig.vacationImagesAddressForAdmin);
    return vacations;
}

async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT vacationId ,destination, description,startDate, endDate, price,
    CONCAT(?,imageName) AS imageUrl
    FROM vacations
    WHERE vacationId = ?`;
    const vacation = await dal.execute(sql, appConfig.vacationImagesAddressForAdmin, vacationId);
    
    return vacation[0];
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validations
    vacation.validatePostVacation();
    vacation.imageName = await imageHandler.saveImage(vacation.image);
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ? , ? , ? , ? , ?, ?)";
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);
    vacation.vacationId = result.insertId;
    delete vacation.image;
    return vacation;
}

//Get image from database
async function getImageNameFromDb(vacationId: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationID = ?`;
    const vacations = await dal.execute(sql, vacationId);
    const vacation = vacations[0];
    if (!vacation) return null;
    return vacation?.imageName;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validations
    vacation.validatePutVacation();

    //Get image name from database:
    vacation.imageName = await getImageNameFromDb(vacation.vacationId);

    if (vacation.image) { vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName) }
    const sql = `UPDATE vacations SET 
    destination = ?, 
    description = ?, 
    startDate = ?, 
    endDate = ?, 
    price = ?, 
    imageName =? 
    WHERE vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description
        , vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    //Delete image file from vacation object
    delete vacation.image;

    return vacation;
}

async function deleteVacation(vacationId: number) {

    //Get image name from database:
    const imageName = await getImageNameFromDb(vacationId);
    imageHandler.deleteImage(imageName);

    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, vacationId);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

export default {
    getAllVacationsForAdmin,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
}