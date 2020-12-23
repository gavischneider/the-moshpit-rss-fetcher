import { ObjectId } from "mongodb";
import { Tag } from "../types/Tag";

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  title: String,
  postIds: [
    {
      type: ObjectId,
      ref: "posts",
    },
  ],
});

const tagModel = (module.exports = mongoose.model("tag", tagSchema));

// Add new tag
module.exports.addTag = (
  newTagTitle: string,
  postId: ObjectId,
  callback: Function
) => {
  let ids: ObjectId[] = [];
  ids.push(postId);
  const tag = new tagModel({
    title: newTagTitle,
    postIds: ids,
  });
  tag.save(callback);
};

module.exports.addOrUpdateTag = (
  tagName: string,
  postId: ObjectId,
  callback: Function
) => {
  // Check if tag exists
  const tagTitle: string = tagName;
  const newPostId: ObjectId = postId;

  tagModel.findOne({ title: tagTitle }).exec((err: Error, result: any) => {
    if (result) {
      // The tag exists, add post id to it
      result.postIds.push(newPostId);
      result.save((err: Error) => {
        if (err) {
          console.log(`Error saving new tag: ${err}`);
          callback(err);
        } else {
          callback(null, result);
        }
      });
    } else {
      // The tag does not exist, create new one
      tagModel.addTag(tagTitle, newPostId, (err: Error, data: any) => {
        if (err) {
          console.log("error occured while creating new tag", err);
          callback(err);
        } else {
          console.log(data);
          callback(null, result);
        }
      });
    }
  });
};
