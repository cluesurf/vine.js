export function calculatePolygonHeight(
  sides: number,
  radius: number,
): number {
  // Ensure the number of sides is valid
  if (sides < 3) {
    throw new Error('Number of sides must be at least 3')
  }

  // Calculate the height of the polygon
  const height = radius * (1 + Math.cos(Math.PI / sides))

  return height
}

export function distanceBetweenVertices({
  sides,
  radius,
  distance,
}: {
  sides: number
  radius: number
  distance: number
}): number {
  if (sides < 3) {
    throw new Error('A polygon must have at least 3 sides.')
  }
  if (distance < 1 || distance >= sides) {
    throw new Error('distance must be between 1 and sides-1.')
  }

  const angle = (distance * Math.PI) / sides
  return 2 * radius * Math.sin(angle)
}

export function calculateShortestWidthOfPolygon(
  sides: number,
  radius: number,
) {
  if (sides < 3) {
    throw new Error('A polygon must have at least 3 sides.')
  }

  if (sides % 2 === 0) {
    return radius * (2 * Math.cos(Math.PI / sides))
  } else {
    return radius * (1 + Math.cos(Math.PI / sides))
  }
}

export function calculateIncircleRadius(
  sides: number,
  outerRadius: number,
) {
  if (sides < 3) {
    throw new Error('A polygon must have at least 3 sides.')
  }
  const radius = outerRadius * Math.cos(Math.PI / sides)
  return radius
}

export function calculatePolygonSideLength(
  sides: number,
  radius: number,
) {
  if (sides < 3) {
    throw new Error('A polygon must have at least 3 sides.')
  }
  const sideLength = 2 * radius * Math.sin(Math.PI / sides)
  return sideLength
}

export function calculateCircumradiusFromIncircleRadius(
  sides: number,
  radius: number,
) {
  if (sides < 3) {
    throw new Error('A polygon must have at least 3 sides.')
  }
  return radius / Math.cos(Math.PI / sides)
}
