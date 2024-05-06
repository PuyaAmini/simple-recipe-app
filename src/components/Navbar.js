import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

//component
import Searchbar from './Searchbar'

// styles:
import './Navbar.css'


export default function Navbar() {

  const {color} = useContext(ThemeContext)

  return (
    <div className='navbar' style={{background:color}}>
      <nav>
       <Link to={'/'} className='brand'><h1>Ninja Ricetta</h1></Link>
       <Searchbar/>
       <Link to={'/create'}>Create Recipe</Link>
      </nav>
    </div>
  )
}
