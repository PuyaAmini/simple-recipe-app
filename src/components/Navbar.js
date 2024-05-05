import { Link } from 'react-router-dom'
import React from 'react'

// styles:
import './Navbar.css'


export default function Navbar() {
  return (
    <div className='navbar'>
      <nav>
       <Link to={'/'}><h1>Ninja Ricetta</h1></Link>
       <Link to={'/create'}>Create Recipe</Link>
      </nav>
    </div>
  )
}
