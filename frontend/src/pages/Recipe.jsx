import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router";
import { Pencil, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isProccessing, setIsProccessing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/recipe/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [id]);

    const deleteRecipe = async () => {
        let notify;
        try {
            setIsProccessing(true)
            const response = await axios.delete(`http://localhost:5000/api/recipe/${id}`);
            navigate("/")
        } catch (error) {
            notify = () => toast.error("Error: please try again!");
            console.log(error);
        } finally {
            setIsProccessing(false);
            notify();
        }
    }

    return (
        <div className="container bg-white p-4 mx-auto my-4 rounded-xl min-h-screen">
            {loading ?
                (
                    <div className="flex justify-center items-center min-h-screen w-full">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                    </div>
                )
                : recipe ?
                    (
                        <>
                            <h3 className="text-xl mb-4 font-semibold">{recipe?.title}</h3>
                            <p className="text-black/80 text-base">{recipe?.description}</p>

                            <p className="text-lg mt-4">Ingredients</p>
                            <ul className="list-disc list-outside ml-5">
                                {recipe?.ingredients?.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>

                            <p className="text-lg mt-4">Instructions</p>
                            <ol className="list-decimal list-outside ml-5">
                                {recipe?.instructions?.map((instruction, index) => (
                                    <li key={index}>
                                        <p>{instruction}</p>
                                    </li>
                                ))}
                            </ol>

                            <p className="mt-2">Cooking time: {recipe?.cooking_time} mins</p>
                            <div className="flex gap-4 items-center justify-start mt-4">
                                <Link to={`/update/${id}`}>
                                    <button className="btn bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex gap-2 items-center">
                                        <Pencil size={20} className="inline" />
                                        Edit
                                    </button>
                                </Link>
                                <Link>
                                    <button className="btn bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md flex gap-2 items-center"
                                        onClick={deleteRecipe}>
                                        {
                                            isProccessing ?
                                                "Deleting..."
                                                :
                                                <>
                                                    <Trash2 size={20} className="inline" />
                                                    Delete
                                                </>
                                        }
                                    </button>
                                </Link>
                            </div>
                        </>
                    )
                    :
                    (
                        <h1>No recipe found</h1>
                    )
            }
            <ToastContainer />
        </div>
    );
}

export default Recipe;
