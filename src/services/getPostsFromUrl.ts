var feed = require("rss-to-json");

// Recieves a URL and gets the RSS feed
const getPostsFromUrl = async (url: string, callback: Function) => {
  var rss = await feed.load(url);
  if (rss) {
    //console.log(rss.items[0]);
    //console.log(new Date(rss.items[0].created));
    callback(null, rss);
  } else {
    console.log("There was an error retrieving the rss feed");
  }
};

module.exports = getPostsFromUrl;
