import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  calculatePolygonDotPosition,
  calculatePolygonHeight,
  calculateShortestWidthOfPolygon,
  distanceBetweenVertices,
} from '~/utils/geometry'

const ANGLE = -Math.PI / 2 // Start the first vertex at the top center

type PolygonInput = {
  width: number
  height: number
  sides: number
  stroke?: string
  strokeWidth?: number
  fill?: string
  rotation?: number // New prop for rotation in degrees
}

function computePolygonPoints({
  width,
  height,
  sides,
  strokeWidth,
  rotation = 0,
}: {
  width: number
  height: number
  sides: number
  strokeWidth: number
  rotation?: number
}) {
  const centerX = width / 2 + strokeWidth / 2
  const centerY = height / 2 + strokeWidth / 2
  const radiusX = width / 2 - strokeWidth / 2
  const radiusY = height / 2 - strokeWidth / 2
  const offsetX = strokeWidth / 2
  const offsetY = strokeWidth / 2

  const rotationRad = (rotation * Math.PI) / 180

  const points = Array.from({ length: sides }, (_, i) => {
    return calculatePolygonDotPosition({
      rotation,
      polygonRadius: radiusX,
      polygonSideCount: sides,
      polygonEdgeNumber: i + 1,
      polygonEdgePositionRatio: 0,
      gap: 0,
      dotRadius: 0,
    })
  })

  // return points

  const minX = Math.min(...points.map(p => p.x))
  const minY = Math.min(...points.map(p => p.y))

  const adjustedPoints = points.map(p => ({
    x: offsetX + p.x,
    y: offsetY + p.y,
  }))

  return adjustedPoints
}

let ID = 1

const Polygon: React.FC<PolygonInput> = ({
  sides,
  width,
  height,
  stroke = 'black',
  strokeWidth = 0,
  fill = 'black',
  rotation = 0, // Default rotation is 0 degrees
}) => {
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const ref = useRef<SVGPolygonElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const bbox = ref.current.getBBox()

    if (bbox.width < width) {
      setXOffset((width - bbox.width) / 2 - strokeWidth / 2)
    }

    if (bbox.height < height) {
      setYOffset((height - bbox.height) / 2 - strokeWidth / 2)
    }
  }, [ref, width, height, strokeWidth])

  const points = useMemo(() => {
    const points = computePolygonPoints({
      width,
      height,
      sides,
      strokeWidth,
      rotation,
    })
    return points.map(p => `${p.x},${p.y}`).join(' ')
  }, [sides, width, height, strokeWidth, rotation])

  if (sides < 3 || sides > 360) {
    throw new Error('Number of sides must be between 3 and 360')
  }

  const id = `polygon${ID++}`
  // calculatePolygonHeight(sides, width / 2) + strokeWidth
  return (
    <>
      <defs>
        <polygon
          ref={ref}
          points={points}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          strokeLinejoin="round"
          style={{ transformOrigin: 'center' }}
          id={id}
        />
      </defs>
      <g>
        <rect
          width={width}
          height={calculateShortestWidthOfPolygon(sides, height / 2)}
          fill="transparent"
          style={{ pointerEvents: 'none' }}
        />
        <use
          // x={xOffset}
          // y={yOffset}
          style={{ transformOrigin: 'center' }}
          xlinkHref={`#${id}`}
        />
      </g>
    </>
  )
}

export default Polygon
