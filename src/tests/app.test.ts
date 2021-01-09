export {};

import "jest";
import request from "supertest";
const mongoose = require("mongoose");
const app = require("../app");

// beforeEach(() => {
//   jest.useFakeTimers();
// });

// First verify that the testing capability works correctly
describe("Jest Tests", () => {
  test("Verify Tests Work", () => {
    expect(true).toBeTruthy();
  });
});

// Next test that the API endpoints are being tested correctly
describe("Test home route", () => {
  it("Request to '/' route should return Home Route!", async (done) => {
    const result = await request(app).get("/").send();

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Home Route!");
    done();
  });
});

// Test the '/feeds' route
describe("Test feeds route", () => {
  it("Request to '/feeds' should return json", async (done) => {
    request(app)
      .get("/feeds")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});

// afterAll(() => {
//   mongoose.connection
//     .close()
//     .then(() => console.log("MongoDB connection closed after tests"))
//     .catch((err: Error) =>
//       console.log(`Error closing Mongo connection after tests, ${err}`)
//     );
// });

afterAll(async (done) => {
  await mongoose.disconnect();
});
