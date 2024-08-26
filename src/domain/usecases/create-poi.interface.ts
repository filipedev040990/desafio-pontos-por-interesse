import { CreatePOIUseCaseInput } from './poi.types'

export interface CreatePOIUseCaseInterface {
  execute: (input: CreatePOIUseCaseInput) => Promise<void>
}
