import { CreatePOIRepositoryInput } from '../usecases/poi.types'

export interface POIRepositoryInterface {
  save: (input: CreatePOIRepositoryInput) => Promise<void>
}
