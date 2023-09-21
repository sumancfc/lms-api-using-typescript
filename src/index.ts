import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is Running on Port: ${port}`));
