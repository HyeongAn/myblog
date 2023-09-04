'use client'
import React from 'react'
import { LayoutProps } from '../../../types/props'
import Header from './header'
import Footer from './footer'
import RootStyleRegistry from '../../../lib/RootStyleRegistry'

const Layout = ({ children }: LayoutProps) => {
  return (
    <RootStyleRegistry>
      <Header xWidth={300} />
      <main style={{ flex: '1' }}>{children}</main>
      <Footer />
    </RootStyleRegistry>
  )
}

export default Layout
