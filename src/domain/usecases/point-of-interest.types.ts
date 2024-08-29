export type CreatePointOfInterestUseCaseInput = {
  name: string
  xCoord: number
  yCoord: number
}

export type CreatePointOfInterestRepositoryInput = {
  id: string
  name: string
  xCoord: number
  yCoord: number
  createdAt: Date
}

export type PointOfInterestOutput = CreatePointOfInterestRepositoryInput

export type ListPointOfInterestByProximityInput = {
  xCoord: number
  yCoord: number
  dMax: number
}

export type ListPointOfInterestByProximityOutput = {
  name: string
}
