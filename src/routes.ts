import {Express, Request, Response} from "express";
import {createUserHandler} from "./controllers/user.controller";
import {createUserSchema, createUserSessionSchema} from "./validators/user.validator";
import {createSessionHandler} from "./controllers/session.controller";
import {requiredUser, validateRequest} from "./middleware";
import {sendConnectionRequestHandler} from "./controllers/userConnection.controller";

export default function (app: Express) {
    app.get("/is-alive", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/create/user", validateRequest(createUserSchema), createUserHandler);
    app.post("/api/login", validateRequest(createUserSessionSchema), createSessionHandler);
    app.post("/api/send-connection/:accountNumber", requiredUser, sendConnectionRequestHandler);

}
