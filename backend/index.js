import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import recipeRoute from "./routes/recipe.js";
import cors from "cors";

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

app.use("/api/recipe",recipeRoute)

app.listen(PORT, async () => {
    await connectDB(process.env.MONGODB_URI);
    console.log(`Server is runinng on ${PORT}`)
})