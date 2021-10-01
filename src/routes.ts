import {Express, Request, Response} from "express";
import {createUserSchema, createUserSessionSchema, createSendMoneySchema} from "./validators";
import {requiredUser, validateRequest} from "./middleware";
import {
    calculateAccountHandler,
    sendTransactionHandler,
    createSessionHandler,
    deleteConnectionHandler,
    sendConnectionRequestHandler,
    createUserHandler
} from "./controllers";

export default function (app: Express) {
    app.get("/is-alive", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/create/user", validateRequest(createUserSchema), createUserHandler);
    app.post("/api/login", validateRequest(createUserSessionSchema), createSessionHandler);
    app.post("/api/send-connection/:accountNumber", requiredUser, sendConnectionRequestHandler);
    app.delete("/api/send-connection/:accountNumber", requiredUser, deleteConnectionHandler);
    app.post("/api/send-money", validateRequest(createSendMoneySchema), requiredUser, sendTransactionHandler);
    app.get("/api/calculate", requiredUser, calculateAccountHandler);

}
