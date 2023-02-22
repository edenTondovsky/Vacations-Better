import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import adminVacationsService from "../5-services/admin-vacations-service";

const router = express.Router();

// Get http://localhost:4001/api/admin/vacations
router.get("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacations = await adminVacationsService.getAllVacationsForAdmin(user);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});
// Get http://localhost:4001/api/admin/vacations/:vacationId
router.get("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacations = await adminVacationsService.getOneVacation(vacationId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4001/api/admin/vacations
router.post("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await adminVacationsService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//PUT http://localhost:4001/api/admin/vacations/:vacationId
router.put("/admin/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updateVacation = await adminVacationsService.updateVacation(vacation);
        console.log(updateVacation);
        response.json(updateVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//DELETE http://localhost:4001/api/admin/vacations/:vacationId
router.delete("/admin/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await adminVacationsService.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/admin/vacations/images/:imageName
router.get("/admin/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName)
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/admin/vacations/reports
router.get("/admin/vacations/reports", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const report = await adminVacationsService.getReport();
        response.json(report);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;