import { PointOfInterestRepositoryInterface } from '@/domain/repositories/point-of-interest.interface'
import { GetAllPointOfInterestUseCaseInterface } from '@/domain/usecases/get-all-point-of-interest.interface'
import { PointOfInterestOutput } from '@/domain/usecases/point-of-interest.types'

export class GetAllPointOfInterestUseCase implements GetAllPointOfInterestUseCaseInterface {
  constructor(private readonly poiRepository: PointOfInterestRepositoryInterface) {}
  async execute(): Promise<PointOfInterestOutput[] | []> {
    return await this.poiRepository.getAll()
  }
}
