import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

const rssFetch: Function = require("./services/rssFetch");
const checkForNewFeeds: Function = require("./services/checkForNewFeeds");
const addNewPublisher: Function = require("./services/addNewPublisher");
const loadFeeds: Function = require("./services/loadFeeds");

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

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  // loadFeeds((err: Error, data: any) => {
  //   if (err) {
  //     console.log(`Problem loading feeds: ${err}`);
  //   } else {
  //     console.log(data);
  //     console.log(`Type of feeds: ${typeof data}`);
  //     //res.send(feeds);

  //     rssFetch(data);
  //   }
  // });
  let tags = await rssFetch();
  console.log(tags);
  res.send(tags);
});

// Add route to add feeds to db, then call updateFeeds
app.post("/addfeed", (req: Request, res: Response, next: NextFunction) => {
  //...call addNewPublisher()
  // Get the new feeds posts and add to db
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
