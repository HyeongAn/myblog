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

export interface InconButtonProps {
  src: string | StaticImport
  alt: string
  name: string
  href?: string
}

export interface SliderProps {
  postData: PostDataType[]
}

export interface SlideCardProps {
  data: PostDataType
}

export type PostDataType = Record<string, any>
