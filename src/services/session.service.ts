import {LeanDocument} from "mongoose";
import config from "config";
import {signJwt} from "../utils/jwt.utils";
import Session, {SessionDocument} from "../models/session.model";
import {UserDocument} from "../models/user.model";

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
        {expiresIn: config.get("accessTokenTtl")}
    );
}



