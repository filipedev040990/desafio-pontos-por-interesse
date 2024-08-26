import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { GetAllPOIUseCaseInterface } from '@/domain/usecases/get-all-poi.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class GetAllPOIController implements ControllerInterface {
  constructor(private readonly getAllPOIUseCase: GetAllPOIUseCaseInterface) {}
  async execute(): Promise<HttpResponse> {
    try {
      const output = await this.getAllPOIUseCase.execute()
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
