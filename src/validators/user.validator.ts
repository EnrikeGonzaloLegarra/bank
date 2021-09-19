import {object, string, number} from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        lastName: string().required("Last Name is required"),
        accountBalance: number().required("Account Balance is required"),
        password: string()
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),

    }),
});
export const createUserSessionSchema = object({
    body: object({
        password: string()
            .required("Password is required")
            .min(14, "Password is too short - should be 14 chars."),
        name: string()
            .required("Name is required"),
    }),
});
