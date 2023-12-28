import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import config from "./config/environments.js";
import bodyParser from "body-parser";
import multerStorage from "./middleware/multer/multerStorage.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
mongoose.connect(`${config.db}`);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB Connected"));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multerStorage);
// Route
app.use(UserRoute);
app.use("/storage/images", express.static(path.join(__dirname, "/storage/images")));

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
