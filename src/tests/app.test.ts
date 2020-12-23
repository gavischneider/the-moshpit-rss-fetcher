export {};

import "jest";
import request from "supertest";

const app = require("../app");

describe("Jest Tests", () => {
  test("Verify Tests Work", () => {
    expect(true).toBeTruthy();
  });
});

describe("GET /", () => {
  xit("respond with json", (done) => {
    // request(app)
    request("localhost:666")
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ message: "Hello world!" })
      .expect(200, done);
  });
});
