import { GetAllPointOfInterestController } from "@/adapters/controllers/get-all-point-of-interest.controller"
import { GetAllPointOfInterestUseCase } from "@/application/usecases/get-all-point-of-interest.usecase"
import { PointOfInterestRepository } from "../database/point-of-interest.repository"

export const getAllPointOfInterestFactory = (): GetAllPointOfInterestController => {
  const poiRepository = new PointOfInterestRepository()
  const getAllPointOfInterestUseCase = new GetAllPointOfInterestUseCase(poiRepository)
  return new GetAllPointOfInterestController(getAllPointOfInterestUseCase)
}
