export type MolfileAtom = {
  symbol: string
  x: number
  y: number
}

export type MolfileBond = {
  start: number
  end: number
  number: number
}

export function parseMolfile({ text }: { text: string }) {
  const lines = text.split('\n')
  const atoms: Array<MolfileAtom> = []
  const bonds: Array<MolfileBond> = []

  // Skipping the header lines
  const countsLine = lines[3]
  const atomCount = parseInt(countsLine.substring(0, 3).trim())
  const bondCount = parseInt(countsLine.substring(3, 6).trim())

  // Reading atoms
  for (let i = 4; i < 4 + atomCount; i++) {
    const line = lines[i]
    const x = parseFloat(line.substring(0, 10).trim())
    const y = parseFloat(line.substring(10, 20).trim())
    const symbol = line.substring(31, 34).trim()
    atoms.push({ symbol, x, y })
  }

  // Reading bonds
  for (let i = 4 + atomCount; i < 4 + atomCount + bondCount; i++) {
    const line = lines[i]
    const start = parseInt(line.substring(0, 3).trim()) - 1
    const end = parseInt(line.substring(3, 6).trim()) - 1
    const number = parseInt(line.substring(6, 9).trim())
    bonds.push({ start, end, number })
  }

  return { atoms, bonds }
}
