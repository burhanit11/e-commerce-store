import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGDB_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
