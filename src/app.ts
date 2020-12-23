import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

import rssFetch from "./rssFetch";

require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow seesion cookie from browser to come through
  })
);

const port = process.env.PORT || 666;

const connectionString = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err: Error) => console.log(`There was an error: ${err}`));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Home Route");
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
