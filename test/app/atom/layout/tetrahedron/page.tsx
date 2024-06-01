'use client'

import TetrahedralPeriodicTable from '~/components/TetrahedralPeriodicTable'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-64 gap-16">
      <TetrahedralPeriodicTable blockWidth={64} />
    </main>
  )
}
