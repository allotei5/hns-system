import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import LandingPage from './pages/LandingPage'
import Navbar from './components/NavBar.jsx'
import ConsentList from './pages/ConsentList.jsx'
import ConsentToReleaseClientInformation from './pages/ConsentToReleaseClientInformation.jsx'
import PrintPage from './pages/PrintPage.jsx'
import AdminListConsents from './pages/AdminListConsents.jsx'
import SingleConsent from './pages/SingleConsent.jsx';

const queryClient = new QueryClient();

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
      {
        path: '/consents',
        element: <AdminListConsents />
      },
      {
        path: '/consent/:id',
        element: <SingleConsent />
      },
    ]
  }
])

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
