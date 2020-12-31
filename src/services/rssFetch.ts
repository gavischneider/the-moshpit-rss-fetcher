const feeds: Array<Publisher> = require("../constants/feeds").feeds;
import { Publisher } from "../types/Publisher";
import { Post } from "../types/Post";
const getPostsFromUrl = require("./getPostsFromUrl");
const getImgFromHTML = require("./getImgFromHtml");

const postModel = require("../models/post");
const tagModel = require("../models/tag");

let tags: any[] = [];
const rssFetch = async () => {
  //feeds: Publisher[]
  // For each feed:
  feeds.map((feed: Publisher) => {
    // Get the posts from the feed url
    getPostsFromUrl(feed.url, (err: Error, data: any) => {
      if (err) {
        console.log("An error occured", err);
      } else {
        //console.log(data);
        const rssFeed = data.items;

        // For each post in the feed:
        rssFeed.map((post: any) => {
          // Check if post already exists
          postModel.searchForPost(post.id, (err: Error, exists: boolean) => {
            if (!exists) {
              //If the post does not exist, start building the post object
              const newPost = {
                title: post.title,
                id: post.id,
                description: post.description,
                url: post.url,
                created: post.created,
                author: post.author,
                category: post.category,
                enclosures: post.enclosures,
                image: "",
                publisher: feed.name,
                upvotes: [],
              };

              // We have the post data, now we need to check where the image is
              if (newPost.enclosures[0] !== undefined) {
                newPost.image = newPost.enclosures[0].url;
                console.log(
                  "---------- We didnt have to look: " + newPost.image
                );
              } else {
                newPost.image = getImgFromHTML(newPost.description);
                console.log(
                  "+++++++++++ The image we found is: " + newPost.image
                );
              }

              // Post is ready to be stored
              postModel.addPost(newPost, (err: Error, data: any) => {
                if (err) {
                  // console.log(
                  //   "An error occured while storing new post in DB",
                  //   err
                  // );
                } else {
                  console.log("Post stored in DB: ");
                  console.log(data);

                  // Post has been stored, now we need to store its tags
                  const postId = data._id;
                  // For each tag:
                  data.category.map((tag: any) => {
                    // Add the tag to DB or add the posts id if it already exists
                    tags[tag.toLowerCase()] = tags[tag.toLowerCase()] || [];
                    tags[tag.toLowerCase()].push(postId);
                  });
                  console.log("TYPE: ");
                  console.log(typeof tags);
                  tagModel.addManyTags(tags, postId, () => {
                    console.log("MADE IT BACK TO RSS FETCH FILE");
                  });
                }
              });
            } else {
              console.log("The post already exists");
            }
          });
        });
      }
    });
  });
  return tags;
};

module.exports = rssFetch;
