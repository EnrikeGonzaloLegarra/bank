import mongoose from "mongoose";

function connect() {
    const dbUri = 'mongodb+srv://bankTest:bankTest@cluster0.x3iiu.mongodb.net/bankTest?retryWrites=true&w=majority';
    return mongoose
        .connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.info("Database connected");
        })
        .catch((error) => {
            console.error("db error", error);
            process.exit(1);
        });
}

export default connect;
