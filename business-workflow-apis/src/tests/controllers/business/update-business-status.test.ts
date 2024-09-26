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

describe("PUT /api/business/:id", () => {
  it("should update the business status", async () => {
    const business = new Business({
      FEIN: "123456789",
      name: "Test Business",
      status: "New",
    });
    await business.save();

    const updateData = {
      classification: { bureau: "WCIRB", classCode: "9079" },
      phoneNumber: "1234567890",
      xMod: 1.0,
    };

    const response = await request(app)
      .put(`/api/business/${business._id}`)
      .send(updateData)
      .expect(200);

    expect(response.body.business.status).toBe("Sales Approved");
  });

  it("should return 404 if business not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const updateData = {
      classification: { bureau: "WCIRB", classCode: "9079" },
      phoneNumber: "1234567890",
      xMod: 1.0,
    };

    await request(app)
      .put(`/api/business/${nonExistentId}`)
      .send(updateData)
      .expect(404);
  });
});
