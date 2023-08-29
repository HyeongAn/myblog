import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface LayoutProps {
  children: React.ReactNode
}

export interface PostProps {
  params: { slug: PostData['slug'] }
}

export interface PostData {
  data: {
    title: string
    description: string
    coverImage: string
    date: string
  }
  content: string
  slug: string
}

export interface IconButtonProps {
  src: string | StaticImport
  alt: string
  name: string
  href?: string
}

export interface CloseButtonProps {
  src: string | StaticImport
  alt: string
  clickEvent: () => void
}

export interface SliderProps {
  postData: PostDataType[]
}

export interface SlideCardProps {
  data: PostDataType
}

export type PostDataType = Record<string, any>

export interface SideMenuProp {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  children: React.ReactNode
  xPosition: number
  setXPosition: (state: number) => void
}

export interface MenuListProps {
  list: { name: string; href: string }
  clickEvent: () => void
}
