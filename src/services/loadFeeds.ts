const publisherModel = require("../models/publisher");

const loadFeeds = (callback: Function) => {
  publisherModel.find((err: Error, data: any) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = loadFeeds;
