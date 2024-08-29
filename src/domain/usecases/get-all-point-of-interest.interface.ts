import { PointOfInterestOutput } from './point-of-interest.types'

export interface GetAllPointOfInterestUseCaseInterface {
  execute: () => Promise<PointOfInterestOutput[] | []>
}
