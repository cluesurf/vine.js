'use client'

import Atom from '~/components/Atom'
import Box from '~/components/Box'
import Matrix from '~/components/Matrix'
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
    <main className="flex min-h-screen flex-col items-center justify-center p-64 gap-16">
      {/* <div className="flex flex-row gap-16">
        <Matrix
          size={1}
          data={[
            [{ value: 0 }, { value: 'i' }, { value: 1 }],
            [{ value: '√i' }, { value: 0 }, { value: 0 }],
            [{ value: 'i' }, { value: 0 }, { value: 0 }],
            [{ value: 'i' }, { value: 0 }, { value: 0 }],
          ]}
        />
        <Matrix
          size={3}
          square
          fontSize={2}
          data={[
            [{ value: 'i' }, { value: 0 }],
            [{ value: 0 }, { value: 'i', negative: true }],
          ]}
        />
      </div>
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
        </div> */}
      <div className="flex h-full justify-end flex-grow gap-8 items-center">
        <SVG>
          <Atom
            size={32}
            electrons={118}
            label="Xy"
          />
        </SVG>
        <SVG>
          <Atom
            size={32}
            electrons={79}
            label="Au"
          />
        </SVG>
        <SVG>
          <Atom
            size={32}
            electrons={6}
            label="C"
          />
        </SVG>
        <SVG>
          <Atom
            size={32}
            electrons={1}
            label="H"
          />
        </SVG>
        {/* <SVG>
            <Atom
              size={32}
              electrons={6}
              label="C"
            />
          </SVG> */}
        {/* <div>gold</div> */}
        {/* </div> */}
      </div>
    </main>
  )
}
