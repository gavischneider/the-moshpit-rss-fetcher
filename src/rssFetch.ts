import { feeds } from "./constants/feeds";
import { Publisher } from "./types/Publisher";
import { Post } from "./types/Post";
import getPostsFromUrl from "./services/getPostsFromUrl";
import getImgFromHTML from "./services/getImgFromHtml";

const postModel = require("./models/post");
const tagModel = require("./models/tag");

const rssFetch = () => {
  // For each feed:
  feeds.map((feed: Publisher) => {
    // Get the posts from the feed url
    getPostsFromUrl(feed.url, (err: Error, data: any) => {
      if (err) {
        console.log("An error occured", err);
      } else {
        console.log(data);
        const rssFeed = data.items;

        // For each post in the feed:
        rssFeed.map(async (post: any) => {
          // Check if post already exists
          const exists = await postModel.searchForPost(post.id);
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
              console.log("---------- We didnt have to look: " + newPost.image);
            } else {
              newPost.image = getImgFromHTML(newPost.description);
              console.log(
                "+++++++++++ The imaage we found is: " + newPost.image
              );
            }

            // Post is ready to be stored
            postModel.addPost(newPost, (err: Error, data: any) => {
              if (err) {
                console.log(
                  "An error occured while storing new post in DB",
                  err
                );
              } else {
                console.log("Post stored in DB: ");
                console.log(data); // Check what this is and update map below

                // Post has been stored, now we need to store its tags
                const postId = data.items[0]._id; // Update!!!!!!
                // For each tag:
                data.items[0].category.map((tag: any) => {
                  // Add the tag to DB or add the posts id if it already exists
                  tagModel.addOrUpdateTag(
                    tag,
                    postId,
                    (err: Error, data: any) => {
                      if (err) {
                        console.log(
                          "An error occured while adding / updating tag in DB",
                          err
                        );
                      } else {
                        console.log("Tag stored / updated in DB: ");
                        console.log(data);
                      }
                    }
                  );
                });
              }
            });
          }
        });
      }
    });
  });
};

export default rssFetch;
