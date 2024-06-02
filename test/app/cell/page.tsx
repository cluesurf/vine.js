'use client'

import Cell2D from '~/components/Cell2D'
import SVG from '~/components/SVG'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-64 gap-16">
      <SVG>
        <Cell2D />
      </SVG>
    </main>
  )
}
