import { GetAllPOIController } from '@/adapters/controllers/get-all-poi.controller'
import { GetAllPOIUseCase } from '@/application/usecases/get-all-poi.usecase'
import { POIRepository } from '../database/poi.repository'

export const getAllPOIFactory = (): GetAllPOIController => {
  const poiRepository = new POIRepository()
  const getAllPOIUseCase = new GetAllPOIUseCase(poiRepository)
  return new GetAllPOIController(getAllPOIUseCase)
}
