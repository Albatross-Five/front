import { Inter } from 'next/font/google'
import './globals.css'

import Image from 'next/image'
import { Button } from 'react-bootstrap/'

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
        <Image src="/HAGIMA.svg" alt="Logo of Hagima" width={100} height={50} priority={true} />

        {children}
      </body>
    </html>
  )
}
