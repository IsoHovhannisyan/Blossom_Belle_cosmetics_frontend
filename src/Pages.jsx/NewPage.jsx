import React from 'react'
import {  NavLink as Link, Outlet } from 'react-router-dom'
import '../css/New/New.css';


export function NewPage() {
  return (
    <div className='New '>
        <div className='NewNav'>
          <div className='LinkDiv'><Link to='/new' className='Link'>New Makeup</Link></div>
          <div className='LinkDiv'><Link to='/new/skincare' className='Link'> New Skincare</Link></div>
          <div className='LinkDiv'><Link to='/new/brashes' className='Link'>New Brashes </Link></div>
          <div className='LinkDiv'><Link to='/new/haircare' className='Link'>New Haircare </Link></div>
          <div className='LinkDiv'><Link to='/new/gifts' className='Link'>New Gifts </Link></div>
      </div>
      <main className=' flex justify-center items-center'><Outlet /></main>
    </div>
  )
}
