type BlockInput = BlockData & { width: number; height: number }

const Block: React.FC<BlockInput> = ({
  width,
  height,
  ...data
}: BlockInput) => {
  if (data.value === 0) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-gray-500 text-white rounded-sm"
      >
        0
      </div>
    )
  }

  if (typeof data.value === 'number') {
    if (data.value < 0) {
      return (
        <div
          style={{ width, height }}
          className="flex items-center justify-center bg-gray-200 rounded-sm"
        >
          {data.value}
        </div>
      )
    } else {
      return (
        <div
          style={{ width, height }}
          className="flex items-center justify-center bg-gray-800 text-white rounded-sm"
        >
          {data.value}
        </div>
      )
    }
  }

  if (data.negative) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-gray-200 rounded-sm"
      >
        -{data.value}
      </div>
    )
  } else {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-gray-800 text-white rounded-sm"
      >
        {data.value}
      </div>
    )
  }
}

type BlockData = { value: number | string; negative?: boolean }

type MatrixInput = {
  data: Array<Array<BlockData>>
  size: 1 | 2 | 3
  fontSize?: 1 | 2 | 3
  square?: boolean
}

const SIZE: Record<1 | 2 | 3, { width: number; height: number }> = {
  1: { width: 32, height: 32 },
  2: { width: 48, height: 32 },
  3: { width: 64, height: 48 },
}

const TEXT_SIZE: Record<1 | 2 | 3, number> = {
  1: 16,
  2: 24,
  3: 32,
}

const Matrix: React.FC<MatrixInput> = ({
  size,
  fontSize: fs,
  data,
  square,
}) => {
  const s = SIZE[size]
  const w = square ? Math.max(s.width, s.height) : s.width
  const h = square ? Math.max(s.width, s.height) : s.height
  const fontSize = TEXT_SIZE[fs ?? size]
  return (
    <div
      style={{ fontSize }}
      className="h-fit flex flex-col gap-4 rounded-sm bg-gray-950 p-4"
    >
      {data.map((row, i) => (
        <div
          className="flex flex-row gap-4"
          key={`row-${i}`}
        >
          {row.map((col, j) => (
            <Block
              key={`col-${i}-${j}`}
              width={w}
              height={h}
              {...col}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Matrix
