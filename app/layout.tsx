import type { Metadata } from 'next'
import { Cinzel_Decorative, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'A Special Message',
  description: 'A surprise awaits...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  )
}
