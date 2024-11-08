import '@/styles/globals.css'
import { ReactNode } from 'react'
import ContractProvider from '@/context/ContractContext'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ContractProvider>
          {children}
        </ContractProvider>
      </body>
    </html>
  )
}