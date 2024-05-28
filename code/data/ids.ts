import { getRandomBytes } from './bytes'

export function getRandomId(n: number) {
  const bytes = getRandomBytes(Math.ceil(n / 2))
  return Buffer.from(bytes).toString('hex')
}
