import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CirclePlus, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

function Add() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);

    useEffect(() => {
        getRecipes()
    }, [id]);

    const getRecipes = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/recipe/${id}`);
            setTitle(data.title);
            setDescription(data.description);
            setIngredients(data.ingredients || [""]);
            setInstructions(data.instructions || [""]);
            setCookingTime(data.cooking_time);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddInputFields = (setter) => {
        setter((prev) => [...prev, ""]);
    };

    const handleValueChange = (event, index, setter) => {
        setter((prev) => prev.map((item, i) => (i === index ? event.target.value : item)));
    };

    const handleRemoveInputField = (index, setter) => {
        setter((prev) => (prev.length > 1 ? prev.filter((item, i) => i !== index) : prev));
    };

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsProcessing(true);

            const obj = {
                title,
                ingredients: ingredients.filter((item) => item.trim() !== ""),
                description,
                cooking_time: cookingTime,
                instructions: instructions.filter((item) => item.trim() !== ""),
            };
            await axios.put(`http://localhost:5000/api/recipe/${id}`, obj);
            toast.success("Updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Error: please try again!");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className='container mx-auto p-4 max-w-lg'>
            {loading ?
                (
                    <div className="flex justify-center items-center min-h-screen w-full">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                    </div>
                )
                :
                (
                    <form onSubmit={onSubmit} className='bg-gray-100 p-6 rounded-xl shadow-md space-y-4'>
                        <div className='flex gap-2 flex-col'>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Title"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className='flex gap-2 flex-col'>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                placeholder="Description"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <h3 className="font-semibold">Ingredients</h3>
                        {
                            ingredients.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ingredient"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={item}
                                        onChange={(e) => handleValueChange(e, index, setIngredients)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={`${ingredients.length === 1 ? "bg-gray-600 hover:bg-gray-700" : "bg-red-500 hover:bg-red-600"} text-white p-2 rounded-md`}
                                        onClick={() => handleRemoveInputField(index, setIngredients)}
                                        disabled={ingredients.length === 1}
                                    >
                                        <Trash2 size={20} className="inline" />
                                    </button>
                                </div>
                            ))
                        }
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md w-full"
                            onClick={() => handleAddInputFields(setIngredients)}
                        >
                            <CirclePlus size={20} className="inline" />
                        </button>

                        <h3 className="font-semibold">Instructions</h3>
                        {
                            instructions.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Instruction"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={item}
                                        onChange={(e) => handleValueChange(e, index, setInstructions)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={`${instructions.length === 1 ? "bg-gray-600 hover:bg-gray-700" : "bg-red-500 hover:bg-red-600"} text-white p-2 rounded-md`}
                                        onClick={() => handleRemoveInputField(index, setInstructions)}
                                        disabled={instructions.length === 1}
                                    >
                                        <Trash2 size={20} className="inline" />
                                    </button>
                                </div>
                            ))
                        }
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md w-full"
                            onClick={() => handleAddInputFields(setInstructions)}
                        >
                            <CirclePlus size={20} className="inline" />
                        </button>

                        <div className='flex gap-2 flex-col'>
                            <label htmlFor="time">Cooking time (mins)</label>
                            <input
                                type="number"
                                id="time"
                                placeholder="Cooking Time"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={cookingTime}
                                onChange={(e) => setCookingTime(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full" disabled={isProcessing}>
                            {isProcessing ? "Updating..." : "Update"}
                        </button>
                    </form>
                )}
            <ToastContainer />
        </div>
    );
}

export default Add;
