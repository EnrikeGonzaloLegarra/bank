import {DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import User, {UserDocument} from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (error) {
        // @ts-ignore
        throw new Error(error);
    }
}

