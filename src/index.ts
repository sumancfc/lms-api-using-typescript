import fs from "fs/promises";
import { default as path } from "path";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// route => all route goes through this funtion
(async () => {
  try {
    const routeFiles = await fs.readdir(path.join(__dirname, "routes"));
    routeFiles.forEach(async (routeFile) => {
      if (routeFile.endsWith(".ts")) {
        const { default: route } = await import(
          path.join(__dirname, "routes", routeFile)
        );
        if (typeof route === "function") {
          app.use("/", route);
        }
      }
    });
  } catch (err) {
    console.error("Error reading route files", err);
  }
})();

export { app };
