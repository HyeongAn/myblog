'use client'
import React, { useEffect, useState } from 'react'
import { LayoutProps } from '../../../types/props'
import Header from './header'
import Footer from './footer'
import { themeContext } from '../../../lib/context.module'
import { Theme } from '../../../types/context'

const Layout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    if (typeof window !== undefined) {
      const contents = window.localStorage.getItem('theme') as Theme
      setTheme(contents ? contents : ('light' as Theme))
    }
  }, [])

  const contextTheme = {
    theme,
    setTheme,
  }

  return (
    <>
      <themeContext.Provider value={contextTheme}>
        <Header xWidth={300} />
        <main style={{ flex: '1' }}>{children}</main>
        <Footer />
      </themeContext.Provider>
    </>
  )
}

export default Layout
