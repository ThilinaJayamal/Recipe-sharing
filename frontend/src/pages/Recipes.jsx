import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

function Home() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getData();
  }, [searchQuery]);

  const getData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/recipe?search=${searchQuery}`);
      setRecipes(response.data.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <form className="flex justify-center mb-6" onSubmit={(e)=>e.preventDefault()}>
        <input
          type="text"
          placeholder="Search by title or ingredients..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="px-6 py-2 bg-blue-700 text-white rounded-r-md hover:bg-blue-800"
          onClick={getData}
        >
          Search
        </button>
      </form>

      <>
        {
          loading ?
            (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
              </div>
            )
            :
            (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                  recipes.length>0 ?
                  (
                    recipes.map((recipe) => (
                      <Card
                        key={recipe._id}
                        id={recipe._id}
                        title={recipe.title}
                        description={recipe.description}
                        cooking_time={recipe.cooking_time}
                      />
                    ))
                  )
                  :
                  (
                    <h1>No recipes found!</h1>
                  )
                }
              </div>
            )
        }
      </>
    </div>
  );
}

export default Home;
