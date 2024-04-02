import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './App.css'
import LandingPage from './pages/LandingPage'
import Navbar from './components/NavBar.jsx'
import ConsentList from './pages/ConsentList.jsx'
import ConsentToReleaseClientInformation from './pages/ConsentToReleaseClientInformation.jsx'
import PrintPage from './pages/PrintPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/consent-list',
        element: <ConsentList />
      },
      {
        path: '/consent-to-release-client-information',
        element: <ConsentToReleaseClientInformation />
      },
      {
        path: '/print',
        element: <PrintPage />
      },
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
