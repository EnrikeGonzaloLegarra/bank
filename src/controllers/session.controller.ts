import {Request, Response} from "express";
import {validatePassword} from "../services/user.service";
import {createAccessToken, createSession} from "../services/session.service";


export async function createSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid user or password");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = createAccessToken({
        user,
        session,
    });

    return res.send({accessToken});
}
