import {DocumentDefinition, FilterQuery, LeanDocument} from "mongoose";
import User, {UserDocument} from "../models/User.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (error) {
        // @ts-ignore
        throw new Error(error);
    }
}

export async function findUser(query: FilterQuery<UserDocument>): Promise<LeanDocument<UserDocument>> {
    return User.findOne(query).lean();
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


