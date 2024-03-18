import React from 'react'
import { Outlet } from 'react-router-dom'

import logo from '../assets/logo@2x.png'
import GoogleTranslate from './GoogleTranslate'


const NavBar = () => {
  return (
    <div className='p-5 mx:10 lg:mx-48 min-h-screen'>
        <div className='flex justify-between'>
            <div className='md:w-2/5'>
                <img src={logo} width="30%"/>
            </div>
            <div>
              <GoogleTranslate />
            </div>
        </div>
        <Outlet />
    </div>
  )
}

export default NavBar