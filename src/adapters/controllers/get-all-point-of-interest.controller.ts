import { ControllerInterface, HttpResponse } from '@/domain/controllers/controller.interface'
import { GetAllPointOfInterestUseCaseInterface } from '@/domain/usecases/get-all-point-of-interest.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { logger } from '@/shared/helpers/logger.helper'

export class GetAllPointOfInterestController implements ControllerInterface {
  constructor(private readonly getAllPointOfInterestUseCase: GetAllPointOfInterestUseCaseInterface) {}
  async execute(): Promise<HttpResponse> {
    try {
      const output = await this.getAllPointOfInterestUseCase.execute()
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
