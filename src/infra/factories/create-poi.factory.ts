import { CreatePOIController } from '@/adapters/controllers/create-poi.controller'
import { CreatePOIUseCase } from '@/application/usecases/create-poi.usecase'
import { POIRepository } from '../database/poi.repository'
import { UUIDService } from '../services/uuid.service'

export const createPOIFactory = (): CreatePOIController => {
  const repository = new POIRepository()
  const uuidService = new UUIDService()
  const usecase = new CreatePOIUseCase(repository, uuidService)
  return new CreatePOIController(usecase)
}
