import * as mongoose from 'mongoose';
import {UserDocument} from "./User.model";

export interface TransactionDocument extends mongoose.Document {
    sender: UserDocument['_id'];
    receiver: UserDocument['_id'];
    amount: number;
    timestamp: Date;
}

const TransactionSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: true},
    timestamp: {type: Date}
});

const Transaction = mongoose.model<TransactionDocument>('Transaction', TransactionSchema);

export default Transaction;
