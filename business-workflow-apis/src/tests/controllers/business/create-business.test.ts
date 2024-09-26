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

describe("POST /api/business", () => {
  it("should create a new business", async () => {
    const newBusiness = {
      FEIN: "123456789",
      name: "Test Business",
      classification: { bureau: "WCIRB", classCode: "9079" },
      phoneNumber: "1234567890",
      xMod: 1.0,
    };

    const response = await request(app)
      .post("/api/business")
      .send(newBusiness)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(newBusiness.name);
  });

  it("should return 400 if FEIN or name is missing", async () => {
    const newBusiness = {
      classification: { bureau: "WCIRB", classCode: "9079" },
      phoneNumber: "1234567890",
      xMod: 1.0,
    };

    await request(app).post("/api/business").send(newBusiness).expect(400);
  });
});
