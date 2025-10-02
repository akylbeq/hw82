import {Request, Response, NextFunction} from 'express';
import {RequestWithUser} from "./auth";

const permit = (...role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as RequestWithUser).user;
        if (user && !role.includes(user.role)) {
            return res.status(403).json({error: "No access"});
        }
        next();
    }
};

export default permit;