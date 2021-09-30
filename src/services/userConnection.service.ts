import {FilterQuery} from "mongoose";
import UserConnection, {UserConnectionDocument} from "../models/UserConnection.model";

export async function createUserConnection(params: UserConnectionDocument) {
    return UserConnection.create(params).then(userConnection => userConnection
        .populate('sender')
        .populate('receiver')
        .execPopulate());
}

export async function findConnection(query: FilterQuery<UserConnectionDocument>) {
    return UserConnection.find({sender: query.sender, receiver: query.receiver}).populate("receiver").lean();
}

export async function validateConnection(query: FilterQuery<UserConnectionDocument>): Promise<boolean> {
    return await UserConnection.find(query).countDocuments() === 0;
}

export async function existConnection(query: FilterQuery<UserConnectionDocument>): Promise<boolean> {
    return await UserConnection.exists(query);
}

export async function deleteConnection(query: FilterQuery<UserConnectionDocument>) {

    return UserConnection.deleteOne(query);
}
