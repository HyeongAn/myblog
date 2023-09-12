import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type Value = string | Buffer
export interface LayoutProps {
  children: React.ReactNode
}

export interface PostProps {
  params: { slug: string }
}

export interface PostData {
  data: PostDataType
  // {
  //   title: string
  //   description: string
  //   coverImage: string
  //   date: string
  // }
  content: Value
  slug: string
}

export interface PostListProps {
  postData: PostData[]
}

export interface PostProps {
  postData: PostData
}

export interface IconButtonProps {
  src: string | StaticImport
  alt: string
  name: string
  href?: string
  managed?: boolean
}

export interface ProfileIconButtonProps {
  profile: IconButtonProps
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
  slug: string
  data: PostDataType
  category: string
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

export interface CurrentProps {
  managed: boolean
  outline: string
}

export interface CarouselProps extends MainPostDataProps {
  currentIndex: number
  setCurrentIndex: (state: number) => void
}

export interface ControllerProps {
  onNextClick: () => void
  onPrevClick: () => void
  currentIndex: number
}

export interface MainPostDataProps {
  postData: PostData[]
}

export interface CarouselCardInfoProps {
  postData: PostData
}

export interface CarouselCardProps extends CarouselCardInfoProps {
  index: number
  currentIndex: number
  setCurrentIndex: (state: number) => void
}
