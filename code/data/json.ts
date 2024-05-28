import stripBom from 'strip-bom'

export function parseJsonBuffer(buffer: Buffer): unknown {
  return JSON.parse(stripBom(buffer.toString()))
}
