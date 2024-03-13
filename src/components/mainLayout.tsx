import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

function MainLayout({ children, currentPage, query}: { children: React.ReactNode, currentPage: number, query?: string }) {
  return (
    <div>
        <Navbar currentPage={currentPage} query={query} />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout