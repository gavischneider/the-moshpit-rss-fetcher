const tagIntervene = (newPost: any) => {
  let newTags: string[] = [];
  switch (newPost.publisher) {
    case "From the Dust Returned":
    case "Metantoine's Magikal Realm":
      for (let i = 0; i < newPost.category.length; i++) {
        newTags.push(newPost.category[i].term);
      }
      break;
    case "Metal Bandcamp":
    case "Metallic Imagery":
      for (let i = 0; i < newPost.category.length; i++) {
        newTags.push(newPost.category[i].$t);
      }
      break;
    default:
      console.log("Default");
  }
  console.log(
    "THESE ARE THE UPDATED TAGS!!!! ------------------------>>>>>>>>>>>>>>>"
  );
  console.log(newTags);
  newPost.category = [...newTags];
  return newPost;
};

module.exports = tagIntervene;
