import './globals.css'

export const metadata = {
  title: 'Inceptionism',
  description: 'This is app converts images into more abstract images using Inceptionism',
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
