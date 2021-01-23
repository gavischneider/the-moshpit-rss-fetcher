const checkFields = (post: any) => {
  // If the post does not have an ID, set the URL as its ID
  post.id = post.id ? post.id : post.url;

  // If the post does not have an author, set an empty string
  post.author = post.author ? post.author : "";

  // If the post does not have a content field, set an empty string
  post.content = post.content ? post.content : "";

  // If the post does not have a description field, set an empty string
  post.description = post.description ? post.description : "";

  return post;
};

module.exports = checkFields;
