import { findNextSize } from '~/utils/numbers'
import Polygon from './Polygon'
import colors from '~/utils/colors'
import {
  calculatePolygonHeight,
  calculateShortestWidthOfPolygon,
} from '~/utils/geometry'

export type ParticleInput = ParticleData & {
  style?: 'dark' | 'light'
  size: number
  rotation?: number
}

const BG_COLOR = {
  dark: colors.gray900,
  light: colors.gray300,
}

const TEXT_COLOR = {
  dark: colors.gray50,
  light: colors.gray950,
}

const SIZE = [256, 128, 64, 32].sort((a, b) => a - b)

type Size = typeof SIZE[number]

const FONT_SIZE: Record<Size, number> = {
  256: 32,
  128: 24,
  64: 16,
  32: 12,
}

const TEXT_OFFSET: Record<Size, number> = {
  256: 0,
  128: 0,
  64: 2,
  32: 3,
}

export default function Particle({
  symbol,
  size,
  rotation = 0,
  style = 'dark',
}: ParticleInput) {
  const fill = BG_COLOR[style]
  const textColor = TEXT_COLOR[style]
  const s = findNextSize(size, SIZE)
  const fontSize = FONT_SIZE[s]
  const textOffset = TEXT_OFFSET[s]
  return (
    <g className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-500 [&_polygon]:hover:stroke-violet-500">
      <Polygon
        width={s}
        height={s}
        sides={3}
        stroke={fill}
        rotation={rotation}
        fill={fill}
        strokeWidth={8}
      />
      <text
        fill={textColor}
        x={size / 2 - 8 / 2}
        y={textOffset + size / 2 - 8 / 2}
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ zIndex: 10 }}
      >
        {symbol}
      </text>
    </g>
  )
}

type ParticlePairInput = {
  size: number
  a: ParticleData
  b: ParticleData
  rotation?: number
}

type ParticleData = {
  symbol?: string
  style?: 'light' | 'dark'
}

function ParticlePair({ size, a, b, rotation = 0 }: ParticlePairInput) {
  const s = findNextSize(size, SIZE)
  const fontSize = FONT_SIZE[s]
  const strokeWidth = 8
  const textOffset = TEXT_OFFSET[s]
  const particleHeight = calculateShortestWidthOfPolygon(3, size / 2)
  return (
    <g>
      <g className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-500 [&_polygon]:hover:stroke-violet-500">
        <Polygon
          width={s}
          height={s}
          sides={3}
          rotation={rotation}
          strokeWidth={8}
          fill={BG_COLOR[a.style ?? 'dark']}
        />
        <text
          fill={TEXT_COLOR[a.style ?? 'dark']}
          x={size / 2 - 8 / 2}
          y={textOffset + size / 2 - 8 / 2}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ zIndex: 10 }}
        >
          {a.symbol}
        </text>
      </g>
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-400 [&_polygon]:hover:stroke-violet-400"
        transform={`translate(0, ${particleHeight - strokeWidth / 4})`}
      >
        <Polygon
          width={s}
          height={s}
          sides={3}
          rotation={rotation + 180}
          strokeWidth={8}
          fill={BG_COLOR[b.style ?? 'light']}
          stroke={BG_COLOR[b.style ?? 'light']}
        />
        <text
          fill={TEXT_COLOR[b.style ?? 'light']}
          x={size / 2 - 8 / 2}
          y={textOffset + size / 3 - 8 / 2}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }}
        >
          {b.symbol}
        </text>
      </g>
    </g>
  )
}

Particle.Pair = ParticlePair

type ParticleSixInput = {
  size: number
  a: ParticleData
  b: ParticleData
  c: ParticleData
  d: ParticleData
  e: ParticleData
  f: ParticleData
  rotation?: number
}

function ParticleSix({
  size,
  a,
  b,
  c,
  d,
  e,
  f,
  rotation = 0,
}: ParticleSixInput) {
  const s = findNextSize(size, SIZE)
  const fontSize = FONT_SIZE[s]
  const strokeWidth = 8
  const textOffset = TEXT_OFFSET[s]
  const particleHeight = calculateShortestWidthOfPolygon(3, s / 2)
  const adjust = particleHeight
  return (
    <g>
      {/* gray */}
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-400 [&_polygon]:hover:stroke-violet-400"
        transform={`translate(${
          strokeWidth / 4 + adjust / 2 + adjust - particleHeight / 2
        }, 0)`}
      >
        <Polygon
          width={s}
          height={s}
          sides={3}
          rotation={rotation}
          strokeWidth={8}
          fill={BG_COLOR[b.style ?? 'light']}
          stroke={BG_COLOR[b.style ?? 'light']}
        />
        <text
          fill={TEXT_COLOR[b.style ?? 'light']}
          x={size / 2 + strokeWidth / 2}
          y={textOffset + size / 2}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }}
        >
          {b.symbol}
        </text>
      </g>
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-400 [&_polygon]:hover:stroke-violet-400"
        transform={`translate(${adjust / 2}, ${
          adjust - strokeWidth / 4
        })`}
      >
        <Polygon
          width={s}
          height={s}
          sides={3}
          rotation={rotation}
          strokeWidth={8}
          fill={BG_COLOR[b.style ?? 'light']}
          stroke={BG_COLOR[b.style ?? 'light']}
        />
        <text
          fill={TEXT_COLOR[b.style ?? 'light']}
          x={size / 2 + strokeWidth / 2}
          y={textOffset + size / 2 + strokeWidth / 2}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }}
        >
          {d.symbol}
        </text>
      </g>
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-400 [&_polygon]:hover:stroke-violet-400"
        transform={`translate(0, 0)`}
      >
        <Polygon
          width={s}
          height={s}
          sides={3}
          rotation={rotation}
          strokeWidth={8}
          fill={BG_COLOR[b.style ?? 'light']}
          stroke={BG_COLOR[b.style ?? 'light']}
        />
        <text
          fill={TEXT_COLOR[b.style ?? 'light']}
          x={size / 2}
          y={textOffset + size / 2}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }}
        >
          {f.symbol}
        </text>
      </g>
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-500 [&_polygon]:hover:stroke-violet-500"
        transform={`translate(${strokeWidth / 4 + adjust / 2}, 0)`}
      >
        <Polygon
          width={s}
          height={s}
          sides={3}
          strokeWidth={8}
          fill={BG_COLOR[a.style ?? 'dark']}
          stroke={BG_COLOR[b.style ?? 'dark']}
          rotation={rotation + 180}
        />
        <text
          fill={TEXT_COLOR[a.style ?? 'dark']}
          x={-strokeWidth / 2 + s / 2}
          y={textOffset + s / 3}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }}
        >
          {a.symbol}
        </text>
      </g>
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-500 [&_polygon]:hover:stroke-violet-500"
        transform={`translate(${
          strokeWidth / 4 + adjust / 2 + adjust - particleHeight / 2
        }, ${-strokeWidth / 4 + adjust})`}
      >
        <Polygon
          width={s}
          height={s}
          sides={3}
          rotation={rotation + 180}
          strokeWidth={8}
          fill={BG_COLOR[b.style ?? 'dark']}
          stroke={BG_COLOR[b.style ?? 'dark']}
        />
        <text
          fill={TEXT_COLOR[b.style ?? 'dark']}
          x={-strokeWidth / 2 + s / 2}
          y={textOffset + s / 3}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }}
        >
          {c.symbol}
        </text>
      </g>
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-500 [&_polygon]:hover:stroke-violet-500"
        transform={`translate(${0}, ${-strokeWidth / 4 + adjust})`}
      >
        <Polygon
          width={s}
          height={s}
          sides={3}
          rotation={rotation + 180}
          strokeWidth={8}
          fill={BG_COLOR[b.style ?? 'dark']}
          stroke={BG_COLOR[b.style ?? 'dark']}
        />
        <text
          fill={TEXT_COLOR[b.style ?? 'dark']}
          x={-strokeWidth / 2 + s / 2}
          y={textOffset + s / 3}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }}
        >
          {e.symbol}
        </text>
      </g>
      <g
        className="[&_polygon]:hover:cursor-pointer [&_text]:hover:cursor-pointer [&_polygon]:hover:fill-violet-500 [&_polygon]:hover:stroke-violet-500"
        transform={`translate(${
          strokeWidth / 2 + s / 2 + strokeWidth / 4
        }, ${strokeWidth / 2 - 16 + adjust})`}
      >
        <Polygon
          width={32}
          height={32}
          sides={6}
          rotation={rotation + 30}
          strokeWidth={0}
          fill={BG_COLOR[b.style ?? 'dark']}
          stroke={BG_COLOR[b.style ?? 'dark']}
        />
      </g>
    </g>
  )
}

Particle.Six = ParticleSix
