import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'

import logo from '../assets/logo@2x.png'
import GoogleTranslate from './GoogleTranslate'

import { AlertContext } from '../contexts/AlertContext'


const NavBar = () => {
  // const { alert } = useContext(AlertContext)
  return (
    <div className='p-5 mx:10 lg:mx-48 min-h-screen'>
        <div className='flex justify-between'>
            <div className='md:w-2/5'>
              <Link to="/">
              <img src={logo} width="30%"/>
              </Link>
            </div>
            <div className={`${alert && 'border '}`}>
              <GoogleTranslate />
            </div>
        </div>
        <Outlet />
    </div>
  )
}

export default NavBar