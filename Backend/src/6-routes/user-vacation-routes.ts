import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import userVacationsService from "../5-services/user-vacations-service";

const router = express.Router();

// Get http://localhost:4000/api//users/vacations
router.get("/user/vacations", verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacations = await userVacationsService.getAllVacationsForUser(user);
        response.json(vacations);

    }
    catch (err: any) {
        next(err);
    }
});


// User Follow vacation
// POST http://localhost:4000/api//users/follow/:vacationId
router.post("/user/follow/:vacationId([0-9]+)", verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await userVacationsService.follow(user.userId, vacationId);
        response.sendStatus(201);
    }
    catch (err: any) {
        next(err);
    }
});

//User Unfollow vacation
// DELETE http://localhost:4000/api//users/follow/:vacationId
router.delete("/user/follow/:vacationId([0-9]+)", verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await userVacationsService.unfollow(user.userId, vacationId);
        response.sendStatus(204);

    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/admin/vacations/images/:imageName
router.get("/user/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName)
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;