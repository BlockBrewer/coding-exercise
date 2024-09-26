import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app, server } from "../../../index";
import { Business } from "../../../models";

jest.setTimeout(30000);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

describe("GET /api/businesses", () => {
  it("should return all businesses", async () => {
    const business1 = new Business({
      FEIN: "123456789",
      name: "Test Business 1",
      status: "New",
    });
    const business2 = new Business({
      FEIN: "987654321",
      name: "Test Business 2",
      status: "New",
    });
    await business1.save();
    await business2.save();

    const response = await request(app).get("/api/businesses").expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });
});
