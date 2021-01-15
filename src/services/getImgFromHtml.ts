const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Extracts the image source from 'description', which is HTML
const getImgFromHTML = (description: string): string => {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const div: HTMLElement = dom.window.document.createElement("div");
  div.innerHTML = description;

  console.log("----------> DESCRIPTION <----------");
  console.log(description);

  const image: HTMLElement = div.getElementsByTagName("img")[0];

  const testImage = div.getElementsByTagName("img");

  console.log("----------> TEST IMAGE FROM DESCRIPTION <----------");
  console.log(testImage);

  let imageSrc: string | null = image ? image.getAttribute("src") : "";
  if (imageSrc === null) {
    imageSrc = " ";
  }
  //console.log("OOOOOOOOOO Image source is: " + imageSrc);
  return imageSrc;
};

module.exports = getImgFromHTML;
