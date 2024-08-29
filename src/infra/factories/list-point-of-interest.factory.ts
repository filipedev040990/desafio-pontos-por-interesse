import { ListPointOfInterestByProximityController } from '@/adapters/controllers/list-point-of-interest-by-proximity.controller'
import { PointOfInterestRepository } from '../database/point-of-interest.repository'
import { ListPointOfInterestByProximityUseCase } from '@/application/usecases/list-point-of-interest-by-proximity.usecase'

export const listPointOfInterestByProximityFactory = (): ListPointOfInterestByProximityController => {
  const repository = new PointOfInterestRepository()
  const usecase = new ListPointOfInterestByProximityUseCase(repository)
  return new ListPointOfInterestByProximityController(usecase)
}
