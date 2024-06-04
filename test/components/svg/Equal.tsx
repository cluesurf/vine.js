export type EqualInput = {
  x?: number
  y?: number
  width?: number
  height?: number
  className?: string
}

export default function Equal({
  x,
  y,
  width,
  height,
  className = `fill-gray-400`,
}: EqualInput) {
  return (
    <svg
      className={className}
      height={height}
      width={width}
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 12"
    >
      <rect
        width={24}
        height={4}
        rx={2}
      />
      <rect
        width={24}
        height={4}
        rx={2}
        y={8}
      />
    </svg>
  )
}
