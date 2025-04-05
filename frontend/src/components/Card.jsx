import React from 'react'
import { Link } from 'react-router'

function Card({ id, title, description,cooking_time }) {
    return (
        <div className='bg-white rounded-xl p-4 flex flex-col justify-between'>
            <div>
                <h3 className='text-xl mb-2 font-semibold'>{title}</h3>
                <p className='text-black/80 text-base'>{description}</p>
                <p className='mt-2'>Cooking time: {cooking_time} mins</p>
            </div>

            <Link to={`recipe/${id}`} className='w-fit'>
                <button className='btn hover:bg-blue-600 bg-blue-700 px-4 py-2 text-white rounded-md mt-4'>See more..</button>
            </Link>
        </div>
    )
}

export default Card