'use client'

import Atom from '~/components/Atom'
import Box from '~/components/Box'
import Particle from '~/components/Particle'
import Polygon from '~/components/Polygon'
import SVG from '~/components/SVG'
import colors from '~/utils/colors'
import {
  calculateIncircleRadius,
  calculateShortestWidthOfPolygon,
} from '~/utils/geometry'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-64 gap-16">
      <div className="flex flex-row gap-16 h-[256px]">
        <div className="flex h-full justify-end flex-grow flex-col gap-8 items-center">
          <SVG width={64}>
            <Particle
              symbol="t"
              size={64}
            />
          </SVG>
          <div>particle</div>
        </div>
        <div className="flex h-full justify-end flex-grow flex-col gap-8 items-center">
          <SVG width={64}>
            <Particle.Pair
              a={{ symbol: 'g+' }}
              b={{ symbol: 'k' }}
              size={64}
            />
          </SVG>
          <div>pair</div>
        </div>
        <div className="flex h-full justify-end flex-grow flex-col gap-8 items-center">
          <SVG width={120}>
            <Particle.Six
              a={{ symbol: 'a' }}
              b={{}}
              c={{ symbol: 'c' }}
              d={{}}
              e={{ symbol: 'e' }}
              f={{}}
              size={64}
            />
          </SVG>
          <div>proton</div>
        </div>
        <div className="flex h-full justify-end flex-grow flex-col gap-8 items-center">
          <SVG width={128}>
            <Atom
              width={32}
              height={32}
            />
          </SVG>
          <div>atom</div>
        </div>
      </div>
    </main>
  )
}
