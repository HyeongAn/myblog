export type Theme = 'dark' | 'light'

export interface ThemeContext {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}
