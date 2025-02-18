export type ArrowDownInput = {
  x?: number
  y?: number
  width?: number
  height?: number
  className?: string
}

export default function ArrowDown({
  x,
  y,
  width,
  height,
  className = `fill-gray-400`,
}: ArrowDownInput) {
  return (
    <svg
      className={className}
      height={height}
      width={width}
      x={x}
      y={y}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M16,29c-0.3,0-0.5-0.1-0.7-0.3L7,20.4c-0.6-0.6-0.7-1.4-0.4-2.2s1-1.2,1.8-1.2H12V5c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v12
		h3.6c0.8,0,1.5,0.5,1.8,1.2s0.1,1.6-0.4,2.2l-8.3,8.3C16.5,28.9,16.3,29,16,29z"
        />
      </g>
    </svg>
  )
}
