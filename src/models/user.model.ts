import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    lastName: string;
    name: string;
    password: string;
    accountBalance: number;
    accountNumber: string;
    createdAt: Date;
    updatedAt: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;
}


const UserSchema = new mongoose.Schema(
    {
        lastName: {type: String, required: true},
        name: {type: String, required: true, unique: true},
        password: {
            type: String
        },
        accountNumber: {
            type: String
        },
        accountBalance: {type: Number, required: true}
    },
    {timestamps: true}
);

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UserDocument;
    user.accountNumber = await generateAccountNumber();
    user.password = await generatePassWord();
    return next();
});

async function generateAccountNumber(): Promise<string> {
    return (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
}

async function generatePassWord(): Promise<string> {
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&@?<>~!%#";
    let result = '';
    for (let i = 0; i < 14; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDocument;
    return candidatePassword === user.password;
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
