import Header from '@/components/Header'
import type { ReactNode } from 'react'

type LayoutProps = {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
    </>
  )
}
