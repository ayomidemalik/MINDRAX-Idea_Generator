import { Lexend, Anton } from 'next/font/google'
import './globals.css'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
})

export const metadata = {
  title: 'MINDRAX - Idea Generator',
  description: 'Turn your niche into endless content ideas.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* The unnecessary wrapper div has been removed */}
      <body className={`${lexend.variable} ${anton.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}