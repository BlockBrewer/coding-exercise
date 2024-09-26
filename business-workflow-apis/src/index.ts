import express, { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import businessRoutes from "./routes/business";
import { Server, IncomingMessage, ServerResponse } from "node:http";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", businessRoutes);

let server: Server<typeof IncomingMessage, typeof ServerResponse>;
const startServer = () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  const gracefulShutdown = () => {
    process.on("SIGTERM", () => {
      console.log("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        console.log("HTTP server closed");
        mongoose.connection.close(false);
      });
    });
  };

  gracefulShutdown();
};

if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(startServer)
    .catch((error) => {
      console.error("Failed to start server:", error);
    });
} else {
  startServer();
}

export { app, server };
