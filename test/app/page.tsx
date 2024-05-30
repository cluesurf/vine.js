'use client'

import Box from '~/components/Box'
import Particle from '~/components/Particle'
import Polygon from '~/components/Polygon'
import SVG from '~/components/SVG'
import colors from '~/utils/colors'
import { calculateIncircleRadius } from '~/utils/geometry'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-64 gap-16">
      <SVG width={64}>
        <Particle.Pair
          a={{ symbol: 'g+' }}
          b={{ symbol: 'k' }}
          size={64}
        />
      </SVG>
      <SVG width={64}>
        <Particle.Pair
          a={{ symbol: 'd+' }}
          b={{ symbol: 't-' }}
          size={64}
        />
      </SVG>
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
      <SVG width={128}>
        <g transform="translate(0, 0)">
          <Polygon
            fill={colors.gray300}
            stroke={colors.gray300}
            sides={5}
            width={128}
            height={128}
            strokeWidth={8}
          />
        </g>
        <g transform={`translate(${16}, ${20})`}>
          <Polygon
            sides={5}
            width={calculateIncircleRadius(5, 64) * 2}
            height={calculateIncircleRadius(5, 64) * 2}
            rotation={36}
            strokeWidth={8}
          />
        </g>
        {/* <g transform="translate(23, 23)">
          <Polygon
            sides={4}
            width={64}
            height={64}
            rotation={45}
          />
        </g> */}
      </SVG>
    </main>
  )
}
