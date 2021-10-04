import {Request, Response} from "express";
import {LeanDocument} from "mongoose";
import {get} from "lodash";
import * as fs from "fs";
import stringify from 'csv-stringify';

import {TransactionDocument, UserDocument} from "../models";
import {calculateTransaction, createTransaction, existConnection, findAndUpdateUser, findUser} from "../services";
import Transaction from "../models/Transaction.model";


export async function sendTransactionHandler(req: Request, res: Response) {
    try {
        const senderId = get(req, "user");
        const sender = await findUser({name: senderId.user.name});
        const receiver = await findUser({accountNumber: req.body.accountNumber});

        if (await IsValidateConnection(sender?._id, receiver?._id)) {
            const amount = req.body.amount;
            let newAccount
            if (amount && sender) {
                if (hasAmount(sender.accountBalance, amount)) {
                    newAccount = await updateAccount(sender._id, receiver?._id, amount);
                    if (newAccount) {
                        await writeFile(newAccount);
                    }
                    if (sender) {
                        await updateSenderWhitAmount(sender, amount);
                    }
                    if (receiver) {
                        await updateReceiverWhitAmount(receiver, amount);
                    }
                } else {
                    return res.status(200).send(`your balance is ${sender?.accountBalance} you can't send ${amount}`);
                }
                return res.status(200).send(newAccount);

            }
        } else {
            return res.status(500).send(`You are not connected with this account number`);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}


async function updateAccount(senderId: number, receiverId: number, amount: number) {
    try {
        const newTransaction = new Transaction({
            sender: senderId,
            receiver: receiverId,
            amount: amount,
            timestamp: Date.now()
        })
        return await createTransaction(newTransaction);

    } catch (e) {
        console.error(e);

    }
}

export async function calculateAccountHandler(req: Request, res: Response): Promise<any> {
    const cal = await calculateTransaction();
    return res.status(200).send(cal);
}

function hasAmount(accountAmount: number, amount: number) {
    return amount <= accountAmount && amount > 0;
}

async function IsValidateConnection(senderId: number, receiverId: number): Promise<boolean> {
    return existConnection({sender: senderId, receiver: receiverId});
}

async function updateSenderWhitAmount(sender: LeanDocument<UserDocument>, amount: number) {
    sender.accountBalance -= amount;
    return findAndUpdateUser({name: sender.name}, sender, {new: true});
}

async function updateReceiverWhitAmount(receiver: LeanDocument<UserDocument>, amount: number) {
    receiver.accountBalance += Number(amount);
    return findAndUpdateUser({name: receiver.name}, receiver, {new: true});

}

interface CsvData {
    sender: string,
    receiver: string,
    amount: number,
    timestamp: string
}

async function writeFile(transaction: TransactionDocument) {
    const data: CsvData[] = [];
    data.push(transactionToCsvData(transaction));
    let columns = {
        sender: 'sender',
        receiver: 'receiver',
        amount: 'amount',
        timestamp: 'timestamp'
    };
    if (!fs.existsSync('transactions.csv')) {
        stringify(data, {header: true, columns: columns}, (err, output) => {
            if (err) throw err;
            fs.writeFile('transactions.csv', output, (err) => {
                if (err) throw err;
                console.log('transactions.csv saved.');
            });
        });
    } else {
        stringify(data, (err, output) => {
            if (err) throw err;
            fs.appendFile('transactions.csv', output, (err) => {
                if (err) throw err;
                console.log('transactions.csv saved.');
            });
        });
    }
}


function transactionToCsvData(transaction: TransactionDocument): CsvData {

    return {
        sender: transaction.sender.toString(),
        receiver: transaction.receiver.toString(),
        amount: transaction.amount,
        timestamp: transaction.timestamp.toLocaleString(),
    }
}
