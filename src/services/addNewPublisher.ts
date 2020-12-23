import { Request, Response } from "express";

const publisherModel = require("../models/publisher");

// Similar to a controller, this function is called by a route and relies on the users request
const addNewPublisher = (req: Request, res: Response) => {
  const name = req.body.name;
  const url = req.body.url;
  const image = req.body.image;
  try {
    publisherModel.addPublisher(name, url, image, (err: Error, data: any) => {
      if (err) {
        console.log("Error occured while saving publisher", err);
      } else {
        console.log("Publisher saved to DB" + data);
      }
    });
  } catch (error) {
    console.log("Error adding new publisher", error);
  }
};

export default addNewPublisher;
