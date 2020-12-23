import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

import rssFetch from "./services/rssFetch";
import checkForNewFeeds from "./services/checkForNewFeeds";
import addNewPublisher from "./services/addNewPublisher";

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

/*
  1. Load feeds from DB
  2. Ocasionally check if there are new feeds, if so, fetch them
  3. Once every hour or two call rssFetch
   */

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Home Route");
});

// Add route to add feeds to db, then call updateFeeds

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
