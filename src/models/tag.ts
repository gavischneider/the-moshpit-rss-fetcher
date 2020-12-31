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

  console.log(`TAG_TITLE: ${tagTitle}`);
  tagModel.findOne({ title: tagTitle }).exec((err: Error, result: any) => {
    console.log(`RESULT: ${result}`);
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
          //console.log(data);
          callback(null, result);
        }
      });
    }
  });
};

module.exports.addManyTags = (
  arrayOfTags: any[],
  postId: any,
  callback: Function
) => {
  // Object.keys(arrayOfTags).map((key: any) => {
  //   console.log("----> Tag: ");
  //   console.log(key);
  //   console.log(arrayOfTags[key]);

  //   tagModel.addOrUpdateTag(key, postId, (err: Error, res: any) => {
  //     if (err) {
  //       console.log("BIG FREAKING ERROR");
  //     }
  //   });
  // });

  Object.keys(arrayOfTags).forEach((tag: any) => {
    console.log("----> Tag: ");
    console.log(tag);
    console.log(arrayOfTags[tag]);
    tagModel.update(
      { title: tag },
      //{ $push: { postIds: arrayOfTags[tag] } },

      { $addToSet: { postIds: { $each: arrayOfTags[tag] } } },

      { upsert: true },
      (err: Error, res: any) => {
        if (err) {
          console.log("Error while inserting many / upserting");
          console.log(err);
        }
      }
    );
  });

  callback();
};
