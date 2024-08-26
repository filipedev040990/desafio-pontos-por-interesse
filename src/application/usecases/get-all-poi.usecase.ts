import { POIRepositoryInterface } from '@/domain/repositories/poi.interface'
import { GetAllPOIUseCaseInterface } from '@/domain/usecases/get-all-poi.interface'
import { POIOutput } from '@/domain/usecases/poi.types'

export class GetAllPOIUseCase implements GetAllPOIUseCaseInterface {
  constructor(private readonly poiRepository: POIRepositoryInterface) {}
  async execute(): Promise<POIOutput[] | []> {
    return await this.poiRepository.getAll()
  }
}
