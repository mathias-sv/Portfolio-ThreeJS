import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio de Mathias Samame - Desarrollador y programador web',
  description: 'Contrata a un desarrollador web profesional para tu proyecto. Desarrollo de sitios web, aplicaciones web, aplicaciones móviles y más.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta property="og:image" content="dinocute" />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
