import React, { useLayoutEffect, useRef, useState } from 'react'
import { useResizeObserver } from 'usehooks-ts'

type SVGInput = {
  className?: string
  width?: number | string
  height?: number | string
  children: React.ReactNode
}

const SVG: React.FC<SVGInput> = ({
  className,
  width,
  height,
  children,
}) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1)
  const ref = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGGElement>(null)
  const [svgBBox, setSvgBBox] = useState<DOMRect>()

  const { width: divWidth = 0, height: divHeight = 0 } =
    useResizeObserver({
      ref,
    })

  const [actualWidth, setWidth] = useState(width)
  const [actualHeight, setHeight] = useState(height)

  useLayoutEffect(() => {
    const typeW = typeof width
    const typeH = typeof height

    if (typeH === 'undefined') {
      if (typeW === 'number') {
        setHeight((width as number) / aspectRatio)
      } else if (typeW === 'string') {
        setHeight(divWidth / aspectRatio)
      } else if (svgBBox) {
        setHeight(svgBBox.height)
      }
    } else {
      setHeight(height)
    }

    if (typeW === 'undefined') {
      if (typeH === 'number') {
        setWidth((height as number) * aspectRatio)
      } else if (typeH === 'string') {
        setWidth(divHeight * aspectRatio)
      } else if (svgBBox) {
        setWidth(svgBBox.width)
      }
    } else {
      setWidth(width)
    }
  }, [width, height, aspectRatio, divWidth, divHeight, svgBBox])

  useLayoutEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox()
      setAspectRatio(bbox.width / bbox.height)
      setSvgBBox(bbox)
    }
  }, [svgRef])

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: actualWidth, height: actualHeight }}
    >
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svgBBox?.width ?? 0} ${svgBBox?.height ?? 0}`}
      >
        <g
          // transform={`translate=${}`}
          ref={svgRef}
        >
          {children}
        </g>
      </svg>
    </div>
  )
}

export default SVG
