import {number, object, string} from "yup";

export const createSendMoneySchema = object({
    body: object({
        accountNumber: string().required("AccountNumber is required"),
        amount: number().required("Amount is required")
    })
})
