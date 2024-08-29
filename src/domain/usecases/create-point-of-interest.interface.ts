import { CreatePointOfInterestUseCaseInput } from './point-of-interest.types'

export interface CreatePointOfInterestUseCaseInterface {
  execute: (input: CreatePointOfInterestUseCaseInput) => Promise<void>
}
