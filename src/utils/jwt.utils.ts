import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey") as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
    try {

    } catch (e) {
        return {
            valid: false,
            // @ts-ignore
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}
