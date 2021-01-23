export {};

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Extracts the image source from 'content', which is HTML - second try: a tag
function getImgFromHTML3(content: string): any {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const div: HTMLElement = dom.window.document.createElement("div");
  div.innerHTML = content;
  const imagesArray = div.getElementsByTagName("a");
  let imageSrc: string | null;
  for (let i = 0; i < imagesArray.length; i++) {
    imageSrc = imagesArray[i].getAttribute("href");
    if (
      imageSrc !== null &&
      (imageSrc.includes(".jpg") || imageSrc.includes(".png"))
    ) {
      // We found the image
      return imageSrc;
    }
  }
  //const imageSrc: string | null = image ? image.getAttribute("href") : "";
  return "";
}

module.exports = getImgFromHTML3;
