const feeds: Array<Publisher> = require("../constants/feeds").feeds;
import { Publisher } from "../types/Publisher";
import { Post } from "../types/Post";
const getPostsFromUrl = require("./getPostsFromUrl");
const findImg = require("./findImg");
const urlIntervene = require("./urlIntervene");
const tagIntervene = require("./tagIntervene");
const checkFields = require("./checkFields");

const postModel = require("../models/post");
const tagModel = require("../models/tag");

let tags: any[] = [];
const rssFetch = async (publishers: Publisher[]) => {
  // For each feed:
  feeds.map((feed: Publisher) => {
    //publishers.map((feed: Publisher) => {
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
          postModel.searchForPost(
            post.id,
            post.url,
            (err: Error, exists: boolean) => {
              if (!exists) {
                // Verify that there are no undefined fields
                post = checkFields(post);

                // If the post does not already exist in the DB, start building the post object
                let newPost = {
                  title: post.title,
                  id: post.id,
                  description: post.description,
                  content: post.content,
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
                newPost = findImg(newPost);

                console.log(
                  "1. -------------------> Made it back after searching for image"
                );

                // Check if we need to change the URL
                const special = [
                  "From the Dust Returned",
                  "Metantoine's Magikal Realm",
                ];
                if (special.includes(newPost.publisher)) {
                  newPost = urlIntervene(newPost);
                }

                // Check if we need to change the tags
                const specialTags = [
                  "From the Dust Returned",
                  "Metal Bandcamp",
                  "Metallic Imagery",
                  "Metantoine's Magikal Realm",
                ];
                if (specialTags.includes(newPost.publisher)) {
                  newPost = tagIntervene(newPost);
                }

                // Post is ready to be stored
                postModel.addPost(newPost, (err: Error, data: any) => {
                  console.log(
                    "2. -------------------> Made it to the addPost function"
                  );
                  if (err) {
                    console.log(
                      "An error occured while storing new post in DB",
                      err
                    );
                  } else {
                    console.log("Post stored in DB: ");
                    console.log(data);

                    // Post has been stored, now we need to store its tags
                    //const postId = data._id;
                    // For each tag:
                    //data.category.map((tag: any) => {
                    //let newTag = tag.toLowerCase();
                    // Add the tag to DB or add the posts id if it already exists
                    //tags[newTag] = tags[newTag] || [];
                    //tags[newTag].concat([postId]);
                    //});
                    //console.log("TYPE: ");
                    //console.log(typeof tags);
                    //tagModel.addManyTags(tags, postId, () => {
                    //console.log("MADE IT BACK TO RSS FETCH FILE");
                    //});
                  }
                });
              } else {
                console.log("The post already exists");
              }
            }
          );
        });
      }
    });
  });
  return tags;
};

module.exports = rssFetch;
