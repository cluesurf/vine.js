import COLORS from '~/utils/colors'
import {
  MolfileAtom,
  MolfileBond,
  parseMolfile,
} from '~/utils/molecules/mol-parser'

// https://github.com/BoboRett/MolViewer/blob/master/molViewer.js

type Molecule2DInput = {
  primaryBondWidth?: number
  secondaryBondWidth?: number
  primaryRadius?: number
  secondaryRadius?: number
  scale?: number
  molfile: string
  textOffset?: number
  fontSize?: number
  hydrogenScale?: number
  minHydrogenDistance?: number
  colors?: Record<string, string>
}

export const ATOM_COLOR: Record<string, string> = {
  H: COLORS.gray300,
  C: COLORS.gray500,
  N: COLORS.blue500,
  O: COLORS.red500,
  S: COLORS.yellow500,
  Cl: COLORS.emerald500,
  Mg: COLORS.emerald500, //'rgb(245 158 11)', // peach
}

export const LARGE_ATOM: Record<string, boolean> = {
  N: true,
  O: true,
  S: true,
  Cl: true,
  Mg: true,
}

// hydrogen = gray
// carbon = black
// nitrogen = blue
// oxygen = red
// sulfur = yellow
// phosphorus = orange
// chlorine = green
// fluorine = olive
// bromine = brown
// iodine = purple
// iron = tan
// calcium = pink
// sodium = cyan
// potassium = magenta
// magnesium = peach
// # repeat colors, with labels
// silicon = yellow
// aluminum = gray

const Molecule2D: React.FC<Molecule2DInput> = ({
  primaryBondWidth = 10,
  secondaryBondWidth = 3,
  primaryRadius = 16,
  secondaryRadius = 3,
  scale = 40,
  hydrogenScale = 12,
  fontSize = 12,
  textOffset = 4,
  molfile,
  minHydrogenDistance = 24,
  colors = ATOM_COLOR,
}) => {
  const { atoms, bonds } = parseMolfile({ text: molfile })
  const elements: Array<React.ReactNode> = []

  // Find minimum x and y coordinates
  const xs = atoms.map(atom => atom.x)
  const ys = atoms.map(atom => atom.y)
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const maxX = Math.max(...xs)
  const maxY = Math.max(...ys)

  const offset = primaryBondWidth + primaryRadius

  // Translate all coordinates
  const translatedAtoms: Array<MolfileAtom & { base?: MolfileAtom }> =
    atoms.map(atom => ({
      ...atom,
      x: atom.x - minX,
      y: atom.y - minY,
    }))

  let key = 1

  const map: Record<number, Array<MolfileBond>> = {}

  const hydrogenBonds = bonds.filter(bond => {
    const startAtom = translatedAtoms[bond.start]
    const endAtom = translatedAtoms[bond.end]
    const isHydrogenStart = startAtom.symbol === 'H'
    const isHydrogenEnd = endAtom.symbol === 'H'
    const isHydrogenBond = isHydrogenStart || isHydrogenEnd
    return isHydrogenBond
  })

  const remainingBonds = bonds.filter(bond => {
    const startAtom = translatedAtoms[bond.start]
    const endAtom = translatedAtoms[bond.end]
    const isHydrogenStart = startAtom.symbol === 'H'
    const isHydrogenEnd = endAtom.symbol === 'H'
    const isHydrogenBond = isHydrogenStart || isHydrogenEnd
    return !isHydrogenBond
  })

  // Draw bonds
  for (const bond of hydrogenBonds) {
    updateBond(bond)
  }
  for (const bond of remainingBonds) {
    updateBond(bond)
  }

  function updateBond(bond: MolfileBond) {
    const startAtom = translatedAtoms[bond.start]
    const endAtom = translatedAtoms[bond.end]
    map[bond.start] ??= []
    map[bond.start].push(bond)
    map[bond.end] ??= []
    map[bond.end].push(bond)

    const isHydrogenStart = startAtom.symbol === 'H'
    const isHydrogenEnd = endAtom.symbol === 'H'
    const isHydrogenBond = isHydrogenStart || isHydrogenEnd

    if (isHydrogenEnd) {
      endAtom.base = startAtom
    } else if (isHydrogenStart) {
      startAtom.base = endAtom
    }

    const w = isHydrogenBond ? secondaryBondWidth : primaryBondWidth

    let startX = startAtom.x * scale + offset
    let startY = startAtom.y * scale + offset
    let endX = endAtom.x * scale + offset
    let endY = endAtom.y * scale + offset

    if (isHydrogenStart) {
      const isLargeAtom = Boolean(LARGE_ATOM[endAtom.symbol])
      const newCoords = calculateCloserCoords(
        endX,
        endY,
        startX,
        startY,
        isLargeAtom ? hydrogenScale + 8 : hydrogenScale,
        isLargeAtom ? minHydrogenDistance + 8 : minHydrogenDistance,
      )
      if (newCoords) {
        startX = newCoords.x
        startY = newCoords.y
      }
    } else if (isHydrogenEnd) {
      const isLargeAtom = Boolean(LARGE_ATOM[startAtom.symbol])
      const newCoords = calculateCloserCoords(
        startX,
        startY,
        endX,
        endY,
        isLargeAtom ? hydrogenScale + 8 : hydrogenScale,
        isLargeAtom ? minHydrogenDistance + 8 : minHydrogenDistance,
      )
      if (newCoords) {
        endX = newCoords.x
        endY = newCoords.y
      }
    }

    if (bond.number === 2) {
      const a = shiftLine(startX, startY, endX, endY, 3.5)
      const b = shiftLine(startX, startY, endX, endY, -3.5)
      elements.push(
        <line
          key={`k-${key++}`}
          x1={a.x1}
          y1={a.y1}
          x2={a.x2}
          y2={a.y2}
          stroke={isHydrogenBond ? COLORS.gray300 : COLORS.gray500}
          strokeWidth={w / 2}
          strokeLinecap="round"
        />,
        <line
          key={`k-${key++}`}
          x1={b.x1}
          y1={b.y1}
          x2={b.x2}
          y2={b.y2}
          stroke={isHydrogenBond ? COLORS.gray300 : COLORS.gray500}
          strokeWidth={w / 2}
          strokeLinecap="round"
        />,
      )
    } else {
      elements.push(
        <line
          key={`k-${key++}`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={isHydrogenBond ? COLORS.gray300 : COLORS.gray500}
          strokeWidth={w}
          strokeLinecap="round"
        />,
      )
    }
  }

  // Draw atoms
  let i = 0
  for (const atom of translatedAtoms) {
    const bonds = map[i]

    // if (atom.symbol === 'H') {
    //   continue
    // }

    // const hs = bonds?.filter(
    //   b =>
    //     translatedAtoms[b.start].symbol === 'H' ||
    //     translatedAtoms[b.end].symbol === 'H',
    // )

    const fill =
      colors[atom.symbol] ?? ATOM_COLOR[atom.symbol] ?? COLORS.gray400

    let cx = atom.x * scale + offset
    let cy = atom.y * scale + offset

    if (atom.symbol === 'H') {
      const base = atom.base!
      const isLargeAtom = Boolean(LARGE_ATOM[base.symbol])
      const newCoords = calculateCloserCoords(
        base.x * scale + offset,
        base.y * scale + offset,
        cx,
        cy,
        isLargeAtom ? hydrogenScale + 16 : hydrogenScale,
        isLargeAtom ? minHydrogenDistance + 16 : minHydrogenDistance,
      )

      if (newCoords) {
        cx = newCoords.x
        cy = newCoords.y
      }
    }

    elements.push(
      <circle
        key={`k-${key++}`}
        cx={cx}
        cy={cy}
        r={
          atom.symbol === 'H' || atom.symbol === 'C'
            ? secondaryRadius
            : primaryRadius
        }
        fill={fill}
      />,
    )

    if (atom.symbol !== 'H' && atom.symbol !== 'C') {
      elements.push(
        <text
          key={`k-${key++}`}
          x={atom.x * scale + offset}
          y={atom.y * scale + offset}
          fontSize={fontSize}
          textAnchor="middle"
          fill="white"
          dy={textOffset}
        >
          {atom.symbol}
        </text>,
      )
    }
    i++
  }

  return (
    <g>
      <rect
        width={maxX * scale - minX * scale + offset}
        height={maxY * scale - minY * scale + offset}
        fill="transparent"
        style={{ pointerEvents: 'none' }}
      />
      {elements}
    </g>
  )
}

export default Molecule2D

// https://depth-first.com/articles/2020/04/13/hydrogen-suppression-in-molfiles/

function calculateCloserCoords(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  distance: number,
  minDistance: number = 0,
) {
  const dx = x2 - x1
  const dy = y2 - y1

  const length = Math.sqrt(dx * dx + dy * dy)

  const newDx = (dx / length) * distance
  const newDy = (dy / length) * distance

  if (length >= minDistance) {
    const newX = x1 + newDx
    const newY = y1 + newDy

    return { x: newX, y: newY }
  }
}

function shiftLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  distance: number,
): { x1: number; y1: number; x2: number; y2: number } {
  // Calculate the direction vector
  const dx = x2 - x1
  const dy = y2 - y1

  // Calculate the length of the direction vector
  const length = Math.sqrt(dx * dx + dy * dy)

  // Normalize the direction vector (optional step for clarity)
  const nx = dx / length
  const ny = dy / length

  // Calculate the perpendicular vector
  const px = -ny // Perpendicular vector in 2D
  const py = nx

  // Scale the perpendicular vector to the desired shift distance
  const shiftX = px * distance
  const shiftY = py * distance

  // Shift the original points by the perpendicular vector
  const newX1 = x1 + shiftX
  const newY1 = y1 + shiftY
  const newX2 = x2 + shiftX
  const newY2 = y2 + shiftY

  return { x1: newX1, y1: newY1, x2: newX2, y2: newY2 }
}
