import { CreatePointOfInterestController } from "@/adapters/controllers/create-point-of-interest.controller"
import { CreatePointOfInterestUseCase } from "@/application/usecases/create-point-of-interest.usecase"
import { PointOfInterestRepository } from "../database/point-of-interest.repository"
import { UUIDService } from "../services/uuid.service"

export const createPointOfInterestFactory = (): CreatePointOfInterestController => {
  const repository = new PointOfInterestRepository()
  const uuidService = new UUIDService()
  const usecase = new CreatePointOfInterestUseCase(repository, uuidService)
  return new CreatePointOfInterestController(usecase)
}
