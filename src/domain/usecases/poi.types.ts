type POIBase = {
  name: string
  xCoord: number
  yCoord: number
}

export type CreatePOIUseCaseInput = POIBase
export type CreatePOIRepositoryInput = POIBase & {
  id: string
  createdAt: Date
}
