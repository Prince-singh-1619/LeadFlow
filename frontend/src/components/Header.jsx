import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation()
  const [activePage, setActivePage] = useState("")

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    setActivePage(path)
  }, [location])

  console.log("active:", activePage)

  return (
    <div className='w-screen h-12 fixed top-0 left-0 bg-black/25 flex z-50 backdrop-blur-[2px]'>
      <header className='w-1/2 text-lg flex items-center justify-around gap-4 mx-auto'>
        <Link to={'/'} className={`${activePage === '' ? ('border-b-2 border-green-600 text-green-500') : ('')}`}>
          LeadForm
        </Link>
        <Link to={'/lead-list'} className={`${activePage === 'lead-list' ? ('border-b-2 border-green-600 text-green-500') : ('')}`}>
          LeadList
        </Link>
      </header>
    </div>
  )
}

export default Header