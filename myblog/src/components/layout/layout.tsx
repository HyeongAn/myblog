'use client'
import React from 'react'
import { LayoutProps } from '../../../types/props'
import Header from './header'
import Footer from './footer'

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header xWidth={300} />
      <main style={{ flex: '1' }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
