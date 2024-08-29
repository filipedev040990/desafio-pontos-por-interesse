import { ListPointOfInterestByProximityInput, ListPointOfInterestByProximityOutput } from './point-of-interest.types'

export interface ListPointOfInterestByProximityUseCaseInterface {
  execute: (input: ListPointOfInterestByProximityInput) => Promise<ListPointOfInterestByProximityOutput[] | []>
}
