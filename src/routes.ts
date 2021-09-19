import {Express, Request, Response} from "express";
import {createUserHandler} from "./controllers/user.controller";
import validateRequest from "./middleware/request.validator";
import {createUserSchema, createUserSessionSchema} from "./validators/user.validator";
import {createSessionHandler} from "./controllers/session.controller";

export default function (app: Express) {
    app.get("/is-alive", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/create/user", validateRequest(createUserSchema), createUserHandler);
    app.post("/api/login", validateRequest(createUserSessionSchema), createSessionHandler);

}
