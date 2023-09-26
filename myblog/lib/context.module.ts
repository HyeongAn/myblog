import { createContext } from 'react'
import { ThemeContext } from '../types/context'

export const themeContext = createContext<ThemeContext>({
  theme: 'light',
  setTheme: () => undefined,
})
