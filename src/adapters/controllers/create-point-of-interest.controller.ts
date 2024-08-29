import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { CreatePointOfInterestUseCaseInterface } from '@/domain/usecases/create-point-of-interest.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class CreatePointOfInterestController implements ControllerInterface {
  constructor(private readonly createPointOfInterestUseCase: CreatePointOfInterestUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.createPointOfInterestUseCase.execute(input?.body)
      return success(204, null)
    } catch (error) {
      return handleError(error)
    }
  }
}
