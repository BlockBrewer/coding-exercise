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

describe("GET /api/business/:id", () => {
  it("should return a business by ID", async () => {
    const business = new Business({
      FEIN: "123456789",
      name: "Test Business",
      status: "New",
    });
    await business.save();

    const response = await request(app)
      .get(`/api/business/${business._id}`)
      .expect(200);

    expect(response.body.business.name).toBe(business.name);
  });

  it("should return 404 if business not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(app).get(`/api/business/${nonExistentId}`).expect(404);
  });
});
