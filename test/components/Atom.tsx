import React, { useMemo, useState } from 'react'
import Polygon from './Polygon'
import colors from '~/utils/colors'
import {
  Point2D,
  calculateCircumradiusFromIncircleRadius,
  calculatePolygonDotPosition,
  calculateShortestWidthOfPolygon,
} from '~/utils/geometry'
import {
  ELECTRON_LAYOUT,
  ElectronPositionDefinition,
  ElectronShellLayout,
  getElectronShellLayout,
} from '~/utils/atoms/electrons'

type AtomInput = {
  size: number
  electrons: number
  label?: string
}

const Atom: React.FC<AtomInput> = ({ size, electrons, label }) => {
  const r = size / 2
  const l2r = calculateCircumradiusFromIncircleRadius(5, r)
  const l3r = calculateCircumradiusFromIncircleRadius(5, l2r)
  const electronRadius = 2
  const [isFocused, setIsFocused] = useState(false)

  const layout = useMemo(() => {
    const layout = getElectronShellLayout(electrons)
    const layout2: Array<
      ElectronShellLayout & {
        radius: number
        color: string
      }
    > = []
    const layout3: Array<
      ElectronShellLayout & {
        radius: number
        color: string
        translation: number
      }
    > = []

    layout.forEach((l, i) => {
      layout2.push({
        ...l,
        radius: i === 0 ? l3r + 16 : layout2[i - 1].radius + 16,
        color: i % 2 === 0 ? colors.gray300 : colors.gray200,
      })
    })

    layout2.reverse()

    const maxRadius = layout2[0].radius!

    layout2.forEach((l, i) => {
      layout3.push({
        ...l,
        translation: i === 0 ? 0 : maxRadius - l.radius,
      })
    })
    return layout3
  }, [electrons, l3r])

  const maxRadius = layout[0].radius!

  const handleHover = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
    >
      {layout.map((l, i) => (
        <g
          key={`translate-${l.translation}`}
          transform={`translate(${l.translation}, ${l.translation})`}
        >
          <Polygon
            sides={5}
            width={l.radius * 2}
            height={l.radius * 2}
            fill={l.color}
            stroke={l.color}
            strokeWidth={8}
          />
          {(i === 0 || isFocused) && (
            <g>
              <ElectronShell
                electronRadius={electronRadius}
                radius={l.radius}
                count={l.count}
              />
            </g>
          )}
        </g>
      ))}
      <g
        transform={`translate(${maxRadius - l3r}, ${maxRadius - l3r})`}
      >
        <Polygon
          fill={colors.gray200}
          stroke={colors.gray200}
          sides={5}
          width={l3r * 2}
          height={l3r * 2}
          strokeWidth={8}
        />
      </g>
      <g transform={`translate(${maxRadius - r}, ${maxRadius - r})`}>
        <Polygon
          sides={5}
          width={r * 2}
          height={r * 2}
          rotation={36}
          strokeWidth={8}
        />
        <text
          fill="white"
          x={r}
          y={r}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ zIndex: 10, fontSize: 14 }}
        >
          {label}
        </text>
      </g>
    </g>
  )
}

export default Atom

export function createShell({
  radius,
  gap,
  count,
  electronRadius,
}: {
  radius: number
  gap: number
  count: number
  electronRadius: number
}) {
  const layout = ELECTRON_LAYOUT[count]

  return layout.map((l: ElectronPositionDefinition) =>
    calculatePolygonDotPosition({
      polygonRadius: radius,
      polygonSideCount: 5,
      polygonEdgeNumber: l.side,
      polygonEdgePositionRatio: l.slot[0] / l.slot[1],
      gap,
      dotRadius: electronRadius,
      offset: 4, // strokeWidth
    }),
  )
}

const ElectronShell: React.FC<{
  electronRadius: number
  radius: number
  count: number
}> = ({ electronRadius, radius, count }) => {
  const points = createShell({
    radius,
    gap: -4,
    count,
    electronRadius,
  })

  const circles = points.map(point => (
    <circle
      key={`point-${point.x}-${point.y}`}
      cx={point.x}
      cy={point.y}
      r={electronRadius}
      fill={colors.gray900}
    />
  ))

  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)

  const maxX1 = Math.max(...xs)
  const minX1 = Math.min(...xs)
  const maxY1 = Math.max(...ys)
  const minY1 = Math.min(...ys)

  const rect = (
    <rect
      x={minX1}
      y={minY1}
      width={maxX1 - minX1 + 2 * 2}
      height={maxY1 - minY1 + 2 * 2}
      fill="transparent"
      style={{ pointerEvents: 'none' }}
    />
  )

  return (
    <g>
      {rect}
      {circles}
    </g>
  )
}
