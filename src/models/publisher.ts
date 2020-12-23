const mongoose = require("mongoose");
import { Publisher } from "../types/Publisher";

const publisherSchema = new mongoose.Schema({
  name: String,
  url: String,
  image: String,
});

const publisherModel = (module.exports = mongoose.model(
  "publisher",
  publisherSchema
));

module.exports.addPublisher = (
  name: string,
  url: string,
  image: string,
  callback: Function
) => {
  const publisher = new publisherModel({
    name,
    url,
    image,
  });
  publisher.save(callback);
};
