// https://github.com/BoboRett/MolViewer/blob/master/molViewer.js

import colors from '~/utils/colors'
import Polygon from './Polygon'

type Cell2DInput = {}

const Cell2D: React.FC<Cell2DInput> = ({}) => {
  return (
    <g>
      {/* <g transform="translate(100, 0)">
        <Polygon
          sides={3}
          width={8}
          height={8}
        />
      </g>
      <g transform="translate(120, 0)">
        <Polygon
          sides={5}
          width={12}
          height={12}
        />
      </g> */}

      <rect
        rx="4"
        x={0}
        y={0}
        fill={colors.gray500}
        width="256"
        height="256"
      />
      <rect
        rx="4"
        x={8}
        y={8}
        fill={colors.gray200}
        width="240"
        height="240"
      />
      <rect
        rx="1"
        fill={colors.red500}
        width="4"
        height="4"
      />
      <rect
        rx="2"
        x={8}
        fill={colors.blue500}
        width="8"
        height="8"
      />
      <rect
        rx="3"
        x={24}
        fill={colors.violet500}
        width="16"
        height="16"
      />
      <rect
        rx="4"
        x={96}
        y={12}
        fill={colors.gray500}
        width="64"
        height="64"
      />
      <rect
        rx="4"
        x={104}
        y={20}
        fill={colors.gray300}
        width="48"
        height="48"
      />
      <rect
        rx="4"
        x={104}
        fill={colors.emerald500}
        width="16"
        height="32"
      />
      <rect
        rx="4"
        x={130}
        fill={colors.emerald500}
        width="16"
        height="32"
      />
    </g>
  )
}

export default Cell2D
