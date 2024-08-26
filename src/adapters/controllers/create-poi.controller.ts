import { HttpRequest } from '@/domain/controllers/controller.interface'
import { CreatePOIUseCaseInterface } from '@/domain/usecases/create-poi.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class CreatePOIController {
  constructor(private readonly createPOIUseCase: CreatePOIUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<any> {
    try {
      await this.createPOIUseCase.execute(input?.body)
      return success(204, null)
    } catch (error) {
      return handleError(error)
    }
  }
}
