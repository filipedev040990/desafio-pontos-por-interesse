export type CreatePOIUseCaseInput = {
  name: string
  xCoord: number
  yCoord: number
}

export type CreatePOIRepositoryInput = {
  id: string
  name: string
  xCoord: number
  yCoord: number
  createdAt: Date
}

export type POIOutput = CreatePOIRepositoryInput
