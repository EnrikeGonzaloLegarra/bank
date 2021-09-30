import express from "express";
import connect from "./db/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const port = 3000;
const host = 'localhost';

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, host, () => {
    console.info(`Server listing at http://${host}:${port}`);

    connect();
    routes(app);

});
