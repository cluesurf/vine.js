import React from 'react'

export type BoxInput = {
  w?: string | number
  h?: string | number
  children: React.ReactNode
}

export default function Box({ w, h, children }: BoxInput) {
  return <div style={{ width: w, height: h }}>{children}</div>
}
