export {};

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Extracts the image source from 'content', which is HTML - first try: img tag
function getImgFromHTML2(content: string): any {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const div: HTMLElement = dom.window.document.createElement("div");
  div.innerHTML = content;
  const imagesArray = div.getElementsByTagName("img");
  let imageSrc: string | null;
  for (let i = 0; i < imagesArray.length; i++) {
    imageSrc = imagesArray[i].getAttribute("src");
    if (imageSrc !== null && imageSrc.endsWith(".jpg")) {
      // We found the image
      return imageSrc;
    }
  }
  return "";
}

module.exports = getImgFromHTML2;
