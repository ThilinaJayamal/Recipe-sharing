import mongoose, { Schema } from "mongoose";

const recipe = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [Schema.Types.String],
        required: true
    },
    instructions: {
        type: [Schema.Types.String],
        required: true
    },
    cooking_time: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.model('Recipe', recipe);