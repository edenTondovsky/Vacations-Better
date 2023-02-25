import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import authService from "../5-services/auth-service";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        // Verify token - crash if not valid:
        await cyber.verifyToken(request);

        // If valid - continue:
        next();

        authService.
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyLoggedIn;