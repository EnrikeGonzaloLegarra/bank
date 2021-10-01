import {Request, Response} from "express";
import {get} from "lodash";
import UserConnection from "../models/UserConnection.model";
import {
    createUserConnection,
    deleteConnection,
    existConnection,
    findUser
} from "../services";
import {LeanDocument} from "mongoose";
import {UserDocument} from "../models";

export async function sendConnectionRequestHandler(req: Request, res: Response) {
    try {
        const userId = get(req, "user");
        const sender: LeanDocument<UserDocument> = await findUser({userId: userId.name});
        const receiver: LeanDocument<UserDocument> = await findUser({accountNumber: req.params.accountNumber});
        if (sender && receiver) {
            if (!await areUsersConnected(sender._id, receiver._id)) {
                const connection =
                    await createUserConnection(new UserConnection({sender: sender, receiver: receiver}));
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

export async function deleteConnectionHandler(req: Request, res: Response) {
    try {
        const userId = get(req, "user");
        const sender: LeanDocument<UserDocument> = await findUser({userId: userId.name});
        const receiver: LeanDocument<UserDocument> = await findUser({accountNumber: req.params.accountNumber});

        if (await areUsersConnected(sender._id, receiver._id)) {
            await deleteConnection({sender: sender._id, receiver: receiver._id});
            return res.status(200).send(`The connection with user with account number ${receiver.accountNumber} has been deleted`);
        } else {
            return res.status(200).send(`You are not connecting with the user with account number ${receiver.accountNumber}`);
        }

    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }

}

async function areUsersConnected(senderId: number, receiverId: number): Promise<boolean> {
    return existConnection({sender: senderId, receiver: receiverId});
}
