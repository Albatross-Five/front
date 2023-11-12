import { Inter } from 'next/font/google'
import './globals.css'
import Logo from '@/components/logo'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hagima',
  description: 'Hands-free Audio Guided Intelligent Mobile Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Image src="/HAGIMA.svg" width={100} height={50} />

        {children}
      </body>
    </html>
  )
}
