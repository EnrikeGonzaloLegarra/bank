import Transaction, {TransactionDocument} from "../models/Transaction.model";

export async function createTransaction(account: TransactionDocument) {
    try {
        return await Transaction.create(account);
    } catch (error) {
        // @ts-ignore
        throw new Error(error);
    }

}
export async function calculateTransaction() {
    try {
        return await Transaction.aggregate([
            {
                $group: {
                    _id: {type: "$type"},
                    countBellow: {$sum: {$cond: [{$lte: ["$amount", 999]}, "$amount", 0]}},
                    countAbove: {$sum: {$cond: [{$gte: ["$amount", 1000]}, "$amount", 0]}}
                }
            },
            {
                $project: {
                    _id : 0 ,
                    totalSum: {$sum: [{$multiply: ["$countBellow", 0.005]}, {$multiply: ["$countAbove", 0.01]}]}
                }
            }
        ])
    } catch
        (error: any) {
        throw new Error(error.message);
    }
}
