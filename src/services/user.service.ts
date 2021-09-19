import {DocumentDefinition} from "mongoose";
import User, {UserDocument} from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (error) {
        // @ts-ignore
        throw new Error(error);
    }
}


export async function validatePassword({name, password,}: { name: UserDocument["name"]; password: string; }) {
    const user = await User.findOne({name});

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
        return false;
    }

    return user.toJSON();
}
