import mongoose from "mongoose";
import {UserDocument} from "./User.model";

export interface UserConnectionDocument extends mongoose.Document {
    sender: UserDocument["_id"];
    receiver: UserDocument["_id"];
    createdAt: Date;
    updatedAt: Date;
}

const UserConnectionSchema = new mongoose.Schema({
        sender: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        receiver: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    },
    {timestamps: true})

const UserConnection = mongoose.model<UserConnectionDocument>("UserConnection", UserConnectionSchema)

export default UserConnection;
