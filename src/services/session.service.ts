import {LeanDocument} from "mongoose";
import {signJwt} from "../utils/jwt.utils";
import Session, {SessionDocument} from "../models/Session.model";
import {UserDocument} from "../models";
import 'dotenv/config'

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({user: userId, userAgent});

    return session.toJSON();
}


export function createAccessToken({user, session,}: {
    user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>;
    session:
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "password">>;
}) {
    return signJwt(
        {
            user: {
                name: user.name,
                lastName: user.lastName,
                createdAt: user.createdAt,
                accountNumber: user.accountNumber
            },
            session: session._id
        },
        {expiresIn: process.env.ACCESS_TOKEN_TTL}
    );
}



