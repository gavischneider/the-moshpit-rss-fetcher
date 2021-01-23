import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import { Publisher } from "./types/Publisher";

const publisherModel = require("./models/publisher");

const getAllPublishers: Function = require("./services/getAllPublishers");
const rssFetch: Function = require("./services/rssFetch");
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
  //res.send({ data: "Home Route!" });

  const publishers = getAllPublishers((err: Error, data: Publisher[]) => {
    if (err) {
      console.log(`Error getting all publishers: ${err}`);
    } else {
      console.log("THESE ARE ALL THE PUBLISHERS: ");
      console.log(data);
      //res.send(data);

      // Send all the publishers to fetchRss
      let tags = rssFetch(data);
      console.log(tags);
      res.send(tags);
    }
  });
});

// Get all feeds
app.get("/feeds", async (req: Request, res: Response, next: NextFunction) => {
  loadFeeds((err: Error, data: any) => {
    if (err) {
      console.log(`Problem loading feeds: ${err}`);
    } else {
      console.log(data);
      //console.log(`Type of feeds: ${typeof data}`);
      res.send({ data: data });

      //rssFetch(data);
    }
  });
});

// Add route to add feeds to db, then call updateFeeds
app.post("/addfeed", (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;
  const url = req.body.url;
  const image = req.body.imagel;

  publisherModel.addPublisher(name, url, image, (err: Error, data: any) => {
    if (err) {
      console.log(`Error adding new publisher, ${err}`);
    } else {
      console.log(data);
    }
  });
});

module.exports = app;
