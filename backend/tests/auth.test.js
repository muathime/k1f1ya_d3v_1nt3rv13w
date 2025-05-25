process.env.JWT_SECRET = "testsecretkey";

const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const authRoute = require("../routes/auth");

const app = express();
app.use(bodyParser.json());
app.use("/auth", authRoute);

describe("POST /auth", () => {
  it("should return a JWT token when email & pass are provided", async () => {
    const res = await request(app).post("/auth").send({
      email: "antony@gmail.com",
      password: "1234567",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe("string");
  });

  it("should return 400 if email or password is missing", async () => {
    const res = await request(app).post("/auth").send({
      email: "antony@gmail.com",
      //password: "1234", // heere password is comented out
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email and password required");
  });
});
