import Layout from '@/components/layout/layout'
import './globals.css'
import StyledComponentsRegistry from '../../lib/registry'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'yoonhu blog',
  description: '공부한 것을 적어두고 기록해두는 yoonhu의 블로그',
  authors: { name: 'yoonhu' },
  generator: 'Next.js',
  keywords: ['nextjs', 'react', 'yoonhu blog', '윤후', '윤후 블로그'],
  creator: 'Yoonhu',
  publisher: 'Vercel',
  verification: { google: 'kRu5kbZA9fbwfFBkXI_jDIKKgfLjTRu04O_eGfG42Ok' },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    url: 'https://yoonhu.vercel.app',
    siteName: 'yoonhu blog',
    title: `yoonhu blog`,
    description: '공부한 것을 적어두고 기록해두는 yoonhu의 블로그',
    images: 'https://yoonhu.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.bf63779c.jpg&w=3840&q=75',
    locale: 'ko_KR',
    type: 'article',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setThemeMode = `
    if(!window.localStorage.getItem('theme')){
      localStorage.theme = 'light'
    }
    document.body.dataset.theme = window.localStorage.getItem('theme')
  `
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <script
          dangerouslySetInnerHTML={{
            __html: setThemeMode,
          }}
        />
        <StyledComponentsRegistry>
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
