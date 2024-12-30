import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction ) {
        const requestId = req.params.id;
        if (isNaN(Number(requestId)) || Number(requestId) <= 0) {
            throw new BadRequestException('Invalid Id!');
        }

        next();
    }
}