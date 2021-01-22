import { Post } from "../types/Post";

const getImgFromHTML = require("./getImgFromHtml");
const getImgFromHTML2 = require("./getImgFromHtml2");
const getImgFromHTML3 = require("./getImgFromHtml3");

const imageIntervene = (newPost: Post) => {
  let newImg = "";
  switch (newPost.publisher) {
    case "Metal Bandcamp":
    case "Metantoine's Magikal Realm":
    case "Black Metal and Brews":
    case "Metallic Imagery":
      newImg = getImgFromHTML(newPost.description);
      break;
    case "Meat Mead Metal":
    case "Metal Riot":
      newImg = getImgFromHTML2(newPost.content);
      if (!newImg.includes(".jpg") && !newImg.includes(".png")) {
        newImg = getImgFromHTML3(newPost.content);
      }
      break;
    default:
      console.log("Default");
  }
  return newImg;
};

module.exports = imageIntervene;
