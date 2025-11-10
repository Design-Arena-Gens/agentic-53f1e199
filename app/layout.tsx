import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gunahon Ka Devta - The God of Sins',
  description: 'A cinematic storytelling experience of love and sacrifice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
