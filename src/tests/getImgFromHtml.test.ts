export {};

const getImgFromHTML = require("../services/getImgFromHtml");

// test("Gets text and locates and returns an image source (url)", () => {
//   expect(getImgFromHTML().toBe());
// });

test("Gets invalid text, returns empty string", () => {
  expect(getImgFromHTML("this is some text")).toBe("");
});
