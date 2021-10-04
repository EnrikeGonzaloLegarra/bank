import jwt from "jsonwebtoken";
import 'dotenv/config'

const privateKey = process.env.PRIVATE_KEY as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
    try {
        const decoded = jwt.verify(token, privateKey);
        return {valid: true, expired: false, decoded};
    } catch (e) {
        return {
            valid: false,
            // @ts-ignore
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}
