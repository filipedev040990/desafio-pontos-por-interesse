import { PointOfInterestRepositoryInterface } from '@/domain/repositories/point-of-interest.interface'
import { ListPointOfInterestByProximityUseCaseInterface } from '@/domain/usecases/list-point-of-interest-by-proximity.interface'
import { ListPointOfInterestByProximityInput, ListPointOfInterestByProximityOutput } from '@/domain/usecases/point-of-interest.types'
import { InvalidParamError } from '@/shared/errors'
import { isValidNumer } from '@/shared/helpers/number.helper'

type ReferencePoint = {
  xCoord: number
  yCoord: number
}

export class ListPointOfInterestByProximityUseCase implements ListPointOfInterestByProximityUseCaseInterface {
  constructor(private readonly poiRepository: PointOfInterestRepositoryInterface) {}
  async execute({ xCoord, yCoord, dMax }: ListPointOfInterestByProximityInput): Promise<ListPointOfInterestByProximityOutput[] | []> {
    this.validate({ xCoord, yCoord, dMax })

    const xMin = xCoord - dMax
    const xMax = xCoord + dMax

    const yMin = yCoord - dMax
    const yMax = yCoord + dMax

    const pois = await this.poiRepository.getByProximity(xMin, xMax, yMin, yMax)
    return pois.filter(poi => {
      const distance = this.calculateDistance({ xCoord, yCoord }, { xCoord: poi.xCoord, yCoord: poi.yCoord })
      return distance <= dMax
    })
  }

  validate(input: ListPointOfInterestByProximityInput): void {
    const requiredFields: Array<keyof ListPointOfInterestByProximityInput> = ['xCoord', 'yCoord', 'dMax']
    for (const field of requiredFields) {
      if (!isValidNumer(input[field])) {
        throw new InvalidParamError(field)
      }
    }
  }

  //Distância Euclideana: √((x1 – x2)² + (y1 – y2)²).
  calculateDistance(referencePoint: ReferencePoint, poi: ReferencePoint): number {
    const distanceX = Math.abs(referencePoint.xCoord - poi.xCoord)
    const distanceY = Math.abs(referencePoint.yCoord - poi.yCoord)
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  }
}
