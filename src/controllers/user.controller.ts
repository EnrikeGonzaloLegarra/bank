
import {Request, Response} from "express";
import {createUser} from "../services/user.service";


export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e) {
        console.error(e);
        return res.status(409).send(e);
    }
}



