import { Header } from '@/components/header-3'

export default function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16">{children}</main>
    </div>
  )
}
