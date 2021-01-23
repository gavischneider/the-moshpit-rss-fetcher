const urlIntervene = (newPost: any) => {
  let newUrl = newPost.url.filter((link: any) => {
    if (link.rel.localeCompare("alternate") === 0) {
      return link.href;
    }
  });

  // console.log("<<<<<<<>>>>>> HERES THE URL WE GOT:");
  // console.log(newUrl);
  // console.log("<<<<<<<>>>>>> HERES THE URL[0] WE GOT:");
  // console.log(newUrl[0]);
  // console.log("<<<<<<<>>>>>> HERES THE URL[0].href WE GOT:");
  // console.log(newUrl[0].href);
  newPost.url = newUrl[0].href;
  return newPost;
};

module.exports = urlIntervene;
