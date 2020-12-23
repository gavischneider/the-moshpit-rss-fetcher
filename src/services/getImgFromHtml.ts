const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Extracts the image source from 'description', which is HTML
const getImgFromHTML = (description: string): string => {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const div: HTMLElement = dom.window.document.createElement("div");
  div.innerHTML = description;
  const image: HTMLElement = div.getElementsByTagName("img")[0];
  let imageSrc: string | null = image ? image.getAttribute("src") : "";
  if (imageSrc === null) {
    imageSrc = " ";
  }
  //console.log("OOOOOOOOOO Image source is: " + imageSrc);
  return imageSrc;
};

module.exports = getImgFromHTML;
