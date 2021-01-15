import { Post } from "../types/Post";

export {};
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getImgFromHTML = require("./getImgFromHtml");
const getImgFromHTML2 = require("./getImgFromHtml2");
const getImgFromHTML3 = require("./getImgFromHtml3");

const findImg = (newPost: any) => {
  if (newPost.enclosures[0] !== undefined) {
    newPost.image = newPost.enclosures[0].url;
    console.log("---------- We didnt have to look: " + newPost.image);
  } else {
    newPost.image = getImgFromHTML(newPost.description);

    if (!newPost.image.includes(".jpg") && !newPost.image.includes(".png")) {
      newPost.image = getImgFromHTML2(newPost.content);
    }

    if (!newPost.image.includes(".jpg") && !newPost.image.includes(".png")) {
      newPost.image = getImgFromHTML3(newPost.content);
    }
    console.log("+++++++++++ The image we found is: " + newPost.image);
  }
  return newPost;
};

module.exports = findImg;
