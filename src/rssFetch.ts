import { feeds } from "./constants/feeds";
import { Publisher } from "./types/Publisher";
import { Post } from "./types/Post";
import getPostsFromUrl from "./services/getPostsFromUrl";
import getImgFromHTML from "./services/getImgFromHtml";

const postModel = require("./models/post");

feeds.map((feed: Publisher) => {
  getPostsFromUrl(feed.url, (err: Error, data: any) => {
    if (err) {
      console.log("An error occured", err);
    } else {
      console.log(data);
      const rssFeed = data.items;

      rssFeed.map((post: any) => {
        // Start building the post object
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

        // We have the data, now we need to check where the image is
        if (newPost.enclosures[0] !== undefined) {
          newPost.image = newPost.enclosures[0].url;
          console.log("AAAAAAAAAAA We didnt have to look: " + newPost.image);
        } else {
          newPost.image = getImgFromHTML(newPost.description);
          console.log("PPPPPPPPPPPP The imaage we found is: " + newPost.image);
        }

        // Data is ready to be stored
        postModel.addPost(newPost, (err: Error, data: any) => {
          if (err) {
            console.log("An error occured", err);
          } else {
            console.log("Data stored in DB: ");
            console.log(data);
          }
        });
      });
    }
  });
});
