const urlIntervene = (newPost: any) => {
  let newUrl = newPost.url.filter((link: any) => {
    if (link.rel.localeCompare("alternate") === 0) {
      return link.href;
    }
  });

  return newUrl;
};

module.exports = urlIntervene;
