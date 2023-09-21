import mongoose from "mongoose";
import { app } from "./index";

const port: string | undefined = process.env.PORT;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.URL!);
    console.log("Connected to MongoDB Database!!!");
    app.listen(port, () => console.log(`Server is Running on Port: ${port}`));
  } catch (err) {
    console.error("Failed to Connect to Database", err);
  }
};

startServer();
