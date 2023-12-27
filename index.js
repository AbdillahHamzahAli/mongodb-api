import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import config from "./config/environments.js";
import bodyParser from "body-parser";

const app = express();
mongoose.connect(`${config.db}`);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB Connected"));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Route
app.use(UserRoute);

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
