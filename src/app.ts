import express from "express";
import connect from "./db/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import 'dotenv/config'

const port = Number(process.env.DB_PORT);
const host = String(process.env.DB_HOST);

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, host, () => {
    console.info(`Server listing at http://${host}:${port}`);

    connect();
    routes(app);

});
