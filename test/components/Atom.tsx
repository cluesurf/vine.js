import React from 'react'
import Polygon from './Polygon'
import colors from '~/utils/colors'
import {
  calculateCircumradiusFromIncircleRadius,
  calculateIncircleRadius,
  calculateShortestWidthOfPolygon,
} from '~/utils/geometry'

type AtomInput = {
  width: number
  height: number
}

const Atom: React.FC<AtomInput> = ({ width, height }) => {
  const r = width / 2
  const l2r = calculateCircumradiusFromIncircleRadius(5, r)
  const l3r = calculateCircumradiusFromIncircleRadius(5, l2r)
  const l4r = l3r + 16
  const l5r = l4r + 16
  return (
    <g>
      <g transform={`translate(${0}, ${0})`}>
        <Polygon
          sides={5}
          width={l5r * 2}
          height={l5r * 2}
          fill={colors.gray200}
          stroke={colors.gray200}
          strokeWidth={8}
        />
      </g>
      <g transform={`translate(${l5r - l4r}, ${l5r - l4r})`}>
        <Polygon
          sides={5}
          width={l4r * 2}
          height={l4r * 2}
          fill={colors.gray300}
          stroke={colors.gray300}
          strokeWidth={8}
        />
      </g>
      <g transform={`translate(${l5r - l3r}, ${l5r - l3r})`}>
        <Polygon
          fill={colors.gray200}
          stroke={colors.gray200}
          sides={5}
          width={l3r * 2}
          height={l3r * 2}
          strokeWidth={8}
        />
      </g>
      <g
        transform={`translate(${l5r - r}, ${
          (l5r - r) *
          (calculateShortestWidthOfPolygon(5, r) / (l5r - 30))
        })`}
      >
        <Polygon
          sides={5}
          width={r * 2}
          height={r * 2}
          rotation={36}
          strokeWidth={8}
        />
      </g>
    </g>
  )
}

export default Atom

// const Atom: React.FC<AtomInput> = ({ width, height }) => {
//   const r = width / 2
//   const l2r = calculateIncircleRadius(5, r)
//   const l3r = calculateIncircleRadius(5, l2r)
//   console.log('l2r', l2r)
//   return (
//     <g>
//       <g transform="translate(0, 0)">
//         <Polygon
//           fill={colors.gray300}
//           stroke={colors.gray300}
//           sides={5}
//           width={width}
//           height={height}
//           strokeWidth={8}
//         />
//       </g>

//       <g transform="translate(0, 0)">
//         <Polygon
//           fill={colors.gray300}
//           stroke={colors.gray300}
//           sides={5}
//           width={width}
//           height={width}
//           strokeWidth={8}
//         />
//       </g>
//       <g
//         transform={`translate(${r - l2r}, ${
//           (r - l2r) * (calculateShortestWidthOfPolygon(5, r) / r)
//         })`}
//       >
//         <Polygon
//           sides={5}
//           width={l2r * 2}
//           height={l2r * 2}
//           fill={colors.gray300}
//           stroke={colors.gray300}
//           strokeWidth={8}
//         />
//       </g>
//       <g
//         transform={`translate(${r - l3r}, ${
//           (r - l3r) * (calculateShortestWidthOfPolygon(5, l2r) / r)
//         })`}
//       >
//         <Polygon
//           sides={5}
//           width={l3r * 2}
//           height={l3r * 2}
//           rotation={36}
//           strokeWidth={8}
//         />
//       </g>
//     </g>
//   )
// }

// export default Atom
