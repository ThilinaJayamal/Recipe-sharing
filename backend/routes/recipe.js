import express from "express";
import {
    addRecipe,
    deleteRecipe,
    getAllRecipes,
    getRecipe,
    updateRecipe
}
    from "../controllers/recipe.js";

const router = express.Router();

router.route("/").get(getAllRecipes).post(addRecipe);

router.route("/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe);

export default router