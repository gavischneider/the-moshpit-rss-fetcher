export {};

import "jest";
import request from "supertest";
const app = require("../app");

jest.useFakeTimers();

//const app = require("../app");

describe("Jest Tests", () => {
  test("Verify Tests Work", () => {
    expect(true).toBeTruthy();
  });
});

// describe("GET /", () => {
//   xit("respond with json", (done) => { //xit or it?
//     // request(app)
//     request("localhost:666")
//       .get("/")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect({ message: "Hello world!" })
//       .expect(200, done);
//   });
// });

// it('/ (GET)', () => {
//   return request(app.getHttpServer())
//     .get('/')
//     .expect(200)
//     .expect('Hello World!');
// });
// });

describe("Test ping route", () => {
  it("Request to '/ping' route should return Pong!", async () => {
    const result = await request(app).get("/ping").send();

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Pong!");
  });
});
