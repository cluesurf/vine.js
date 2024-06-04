export type TimesInput = {
  x?: number
  y?: number
  width?: number
  height?: number
  className?: string
}

export default function Times({
  x,
  y,
  width,
  height,
  className = `fill-gray-400`,
}: TimesInput) {
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
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M22.238 18.004l9.883-9.883a3 3 0 1 0-4.242-4.243l-9.883 9.883l-9.883-9.882A3 3 0 1 0 3.87 8.122l9.883 9.882l-9.907 9.907a3 3 0 0 0 4.243 4.242l9.906-9.906l9.882 9.882c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242l-9.881-9.883z"></path>
    </svg>
  )
}
