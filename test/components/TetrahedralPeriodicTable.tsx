import React from 'react'

import { TETRAHEDRAL_PERIODIC_TABLE } from '~/utils/atoms/table'

type TetrahedralPeriodicTableInput = {
  blockWidth?: number
  blockHeight?: number
}

const TetrahedralPeriodicTable: React.FC<
  TetrahedralPeriodicTableInput
> = ({ blockWidth = 38, blockHeight = 32 }) => {
  const header: Array<React.ReactNode> = []
  let i = 0
  while (i < 8) {
    header.push(
      <div
        key={`h-${i}`}
        style={{ width: blockWidth, height: blockHeight }}
        className={`flex justify-center items-center bg-gray-50`}
      >
        {i + 1}
      </div>,
    )
    i++
  }

  const sRows: Array<React.ReactNode> = []
  const pRows: Array<React.ReactNode> = []
  const dRows: Array<React.ReactNode> = []
  const fRows: Array<React.ReactNode> = []

  TETRAHEDRAL_PERIODIC_TABLE.s.forEach((x, i) => {
    sRows.push(
      <div
        key={`s-${i}`}
        className="flex justify-center [&>div]:first:pt-4"
      >
        <div className="flex px-4 pb-4 gap-4 bg-gray-950">
          {x.map((b, k) => (
            <div
              key={`b-${k}`}
              style={{ width: blockWidth, height: blockHeight }}
              className={`flex justify-center items-center bg-gray-50`}
            >
              {b}
            </div>
          ))}
        </div>
      </div>,
    )
  })

  TETRAHEDRAL_PERIODIC_TABLE.p.forEach((x, i) => {
    pRows.push(
      <div
        key={`p-${i}`}
        className="flex justify-center"
      >
        <div className="flex px-4 pb-4 gap-4 bg-gray-950">
          {x.map((b, k) => (
            <div
              key={`b-${k}`}
              style={{ width: blockWidth, height: blockHeight }}
              className={`flex justify-center items-center bg-gray-50`}
            >
              {b}
            </div>
          ))}
        </div>
      </div>,
    )
  })

  TETRAHEDRAL_PERIODIC_TABLE.d.forEach((x, i) => {
    dRows.push(
      <div
        key={`d-${i}`}
        className="flex justify-center"
      >
        <div className="flex px-4 pb-4 gap-4 bg-gray-950">
          {x.map((b, k) => (
            <div
              key={`b-${k}`}
              style={{ width: blockWidth, height: blockHeight }}
              className={`flex justify-center items-center bg-gray-50`}
            >
              {b}
            </div>
          ))}
        </div>
      </div>,
    )
  })

  TETRAHEDRAL_PERIODIC_TABLE.f.forEach((x, i) => {
    dRows.push(
      <div
        key={`d-${i}`}
        className="flex justify-center"
      >
        <div className="flex px-4 pb-4 gap-4 bg-gray-950">
          {x.map((b, k) => (
            <div
              key={`b-${k}`}
              style={{ width: blockWidth, height: blockHeight }}
              className={`flex justify-center items-center bg-gray-50`}
            >
              {b}
            </div>
          ))}
        </div>
      </div>,
    )
  })

  return (
    <div>
      <div className="flex p-4 gap-4">{header}</div>
      <div className="flex flex-col">
        {sRows}
        {pRows}
        {dRows}
        {fRows}
      </div>
    </div>
  )
}

export default TetrahedralPeriodicTable
