import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`connected to database ${conn.connection.host}`)
  } catch (error) {
    console.log("can't connect to database");
    process.exit(1)
  }
}