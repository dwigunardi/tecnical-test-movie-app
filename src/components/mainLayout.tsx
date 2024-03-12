import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

function MainLayout({ children, currentPage}: { children: React.ReactNode, currentPage: number }) {
  return (
    <div>
        <Navbar currentPage={currentPage} />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout