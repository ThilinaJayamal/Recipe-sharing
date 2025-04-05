import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router'
import Recipe from './pages/Recipe'
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'
import Recipes from './pages/Recipes'
import NotFound from './pages/Notfound'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path='/' element={<Recipes />} />
          <Route path='recipe/:id' element={<Recipe />} />
          <Route path='/add' element={<AddRecipe />} />
          <Route path='/update/:id' element={<EditRecipe/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <Footer />
    </div>
  )
}

export default App