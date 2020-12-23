const mongoose = require("mongoose");
import { Post } from "../types/Post";

const postSchema = new mongoose.Schema({
  title: String,
  id: String,
  description: String,
  url: String,
  created: String,
  author: String,
  category: [
    {
      type: String,
    },
  ],
  image: String,
  publisher: String,
  upvotes: [
    {
      type: String,
    },
  ],
});

const postModel = (module.exports = mongoose.model("post", postSchema));

module.exports.addPost = (newPost: Post, callback: Function) => {
  const post = new postModel({
    title: newPost.title,
    id: newPost.id,
    description: newPost.description,
    url: newPost.url,
    created: newPost.created,
    author: newPost.author,
    category: newPost.category,
    image: newPost.image,
    publisher: newPost.publisher,
  });
  post.save(callback);
};

module.exports.searchForPost = async (postId: string) => {
  let exists = false;
  await postModel.findOne({ id: postId }).exec((err: Error, result: any) => {
    if (result) {
      // The post already exists
      exists = true;
      return exists;
    } else {
      // The post does not exist
      return exists;
    }
  });
};
