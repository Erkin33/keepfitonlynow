import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Providers from './providers'
import { Rubik } from 'next/font/google'
import type { Metadata } from 'next'

const geist = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enjoy The Moment!',
  icons: {icon: '/Icons/Enjoy.jpg'}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={geist.className}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow w-full mx-auto h-full" id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
