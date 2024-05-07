import { Link } from 'react-router-dom'
import React from 'react'

//component
import Searchbar from './Searchbar'

// styles:
import './Navbar.css'


export default function Navbar() {


  return (
    <div className='navbar' >
      <nav>
       <Link to={'/'} className='brand'><h1>Ninja Ricetta</h1></Link>
       <Searchbar/>
       <Link to={'/create'}>Create Recipe</Link>
      </nav>
    </div>
  )
}
