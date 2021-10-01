import {Express, Request, Response} from "express";
import {createUserHandler} from "./controllers/user.controller";
import {createUserSchema, createUserSessionSchema} from "./validators/user.validator";
import {createSessionHandler} from "./controllers/session.controller";
import {requiredUser, validateRequest} from "./middleware";
import {deleteConnectionHandler, sendConnectionRequestHandler} from "./controllers/userConnection.controller";
import {calculateAccount, sendTransactionHandler} from "./controllers/transaction.controller";
import {createSendMoneySchema} from "./validators/transaction.validator";

export default function (app: Express) {
    app.get("/is-alive", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/create/user", validateRequest(createUserSchema), createUserHandler);
    app.post("/api/login", validateRequest(createUserSessionSchema), createSessionHandler);
    app.post("/api/send-connection/:accountNumber", requiredUser, sendConnectionRequestHandler);
    app.delete("/api/send-connection/:accountNumber", requiredUser, deleteConnectionHandler);
    app.post("/api/send-money", validateRequest(createSendMoneySchema), requiredUser, sendTransactionHandler);
    app.get("/api/calculate", requiredUser, calculateAccount);

}
