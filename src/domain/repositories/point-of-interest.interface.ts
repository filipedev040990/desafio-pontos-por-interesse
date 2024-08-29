import { CreatePointOfInterestRepositoryInput, PointOfInterestOutput } from '@/domain/usecases/point-of-interest.types'

export interface PointOfInterestRepositoryInterface {
  save: (input: CreatePointOfInterestRepositoryInput) => Promise<void>
  getAll: () => Promise<PointOfInterestOutput[] | []>
  getByProximity: (xMin: number, xMax: number, yMin: number, yMax: number) => Promise<PointOfInterestOutput[] | []>
}
