import React from 'react'
import { Link } from 'react-router-dom'

const ConsentList = () => {
  return (
    <div>
        <h1 className='font-semibold text-2xl md:text-3xl mt-2 mb-20'>List of Consent Forms</h1>
        <div><Link to="/consent-to-release-client-information" className='border border-[#717171] text-[#717171] rounded px-10 py-10'>Consent to Release Client information</Link></div>
    </div>
  )
}

export default ConsentList