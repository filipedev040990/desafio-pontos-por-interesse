import { ControllerInterface, HttpRequest, HttpResponse } from '@/domain/controllers/controller.interface'
import { ListPointOfInterestByProximityUseCaseInterface } from '@/domain/usecases/list-point-of-interest-by-proximity.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class ListPointOfInterestByProximityController implements ControllerInterface {
  constructor(private readonly listPointOfInterestByProximityUseCase: ListPointOfInterestByProximityUseCaseInterface) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const xCoord = Number(input?.query?.xCoord)
      const yCoord = Number(input?.query?.yCoord)
      const dMax = Number(input?.query?.dMax)
      const output = await this.listPointOfInterestByProximityUseCase.execute({ xCoord, yCoord, dMax })
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
