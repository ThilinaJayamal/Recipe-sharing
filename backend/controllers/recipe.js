import Recipe from "../models/recipe.js"

export const getAllRecipes = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const searchRegex = new RegExp(searchQuery, 'i');

        const recipes = await Recipe.find({
            $or: [
                { title: searchRegex },
                { ingredients: searchRegex }
            ]
        });

        return res.status(200).send({
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


export const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).send({ message: "Not Found" })
        }
        return res.status(200).send(recipe);
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

export const addRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, cooking_time } = req.body;
        if (!title || !description || !ingredients || !instructions || !cooking_time) {
            return res.status(400).send({ message: "Error: send all required fields" });
        }
        const recipe = await Recipe.create({
            title,
            description,
            ingredients,
            instructions,
            cooking_time
        })
        return res.status(201).send(recipe);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message })
    }
}

export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, ingredients, instructions, cooking_time } = req.body;
        if (!title || !description || !ingredients || !instructions || !cooking_time) {
            return res.status(400).send({ message: "Error: send all required fields" });
        }

        const updated = await Recipe.findByIdAndUpdate(id,
            {
                title,
                description,
                ingredients,
                instructions,
                cooking_time
            },
            { new: true }
        )
        return res.status(200).send(updated)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message })
    }
}

export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
            return res.status(404).send({ message: "Not Found" })
        }
        return res.status(200).send(recipe);
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}