import {Request, Response} from "express";
import {get} from "lodash";
import {findUser} from "../services/user.service";
import UserConnection from "../models/UserConnection.model";
import {createUserConnection, validateConnection} from "../services/userConnection.service";
import {LeanDocument} from "mongoose";
import {UserDocument} from "../models/User.model";

export async function sendConnectionRequestHandler(req: Request, res: Response) {
    try {
        const userId = get(req, "user");
        const sender: LeanDocument<UserDocument> = await findUser({userId: userId.name});
        const receiver: LeanDocument<UserDocument> = await findUser({accountNumber: req.params.accountNumber});
        if (sender && receiver) {
            if (await IsValidateConnection(sender.id, receiver.id)) {
                const connection = await createUserConnection(new UserConnection({sender: sender, receiver: receiver}));
                return res.status(200).send(connection);
            } else {
                return res.send(`User ${sender.name} with account number ${sender.accountNumber} is already connected to user ${receiver.name} with account number ${receiver.accountNumber}`);
            }
        } else {
            return res.status(200).send(`There is no user with account number ${req.params.accountNumber}`);
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
}

async function IsValidateConnection(senderId: number, receiverId: number): Promise<boolean> {
    return validateConnection({userRequest: senderId, userResponse: receiverId});
}
