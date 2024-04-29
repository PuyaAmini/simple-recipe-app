// styles
import './Home.css'

import React from 'react'
import useFetch from '../../hooks/useFetch'
import Recipe from '../../components/RecipeList'

export default function Home() {

  const {data , isPending , error} = useFetch('http://localhost:3000/recipes')

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading' >Caricamento... </p>}
      {data && <Recipe recipes={data}/>}
    </div>
  )
}
