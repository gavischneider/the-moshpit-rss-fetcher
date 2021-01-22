import { Post } from "../types/Post";

export {};
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getImgFromHTML = require("./getImgFromHtml");
const getImgFromHTML2 = require("./getImgFromHtml2");
const getImgFromHTML3 = require("./getImgFromHtml3");
const imageIntervene = require("./imageIntervene");

const findImg = (newPost: any) => {
  // First check if the post belongs to a publisher that has a special rule
  const special = [
    "Metal Bandcamp",
    "Metantoine's Magikal Realm",
    "Meat Mead Metal",
    "Black Metal and Brews",
    "Metallic Imagery",
    "Metal Riot",
  ];
  if (special.includes(newPost.publisher)) {
    newPost.image = imageIntervene(newPost);
  } else {
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
  }

  return newPost;
};

module.exports = findImg;
