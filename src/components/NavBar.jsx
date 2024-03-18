import React from 'react'
import { Outlet } from 'react-router-dom'

import logo from '../assets/logo@2x.png'


const NavBar = () => {
  return (
    <div className='p-5 mx:10 lg:mx-48 min-h-screen'>
        <div>
            <div className='w-1/5'>
                <img src={logo} width="30%"/>
            </div>
            <div></div>
        </div>
        <Outlet />
    </div>
  )
}

export default NavBar