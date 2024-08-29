import { PointOfInterestRepositoryInterface } from '@/domain/repositories/point-of-interest.interface'
import { UUIDServiceInterface } from '@/domain/services/uuid.interface'
import { CreatePointOfInterestUseCaseInterface } from '@/domain/usecases/create-point-of-interest.interface'
import { CreatePointOfInterestUseCaseInput } from '@/domain/usecases/point-of-interest.types'
import { InvalidParamError } from '@/shared/errors'
import { isValidNumer } from '@/shared/helpers/number.helper'
import { isValidString } from '@/shared/helpers/string.helper'

export class CreatePointOfInterestUseCase implements CreatePointOfInterestUseCaseInterface {
  constructor(
    private readonly poiRepository: PointOfInterestRepositoryInterface,
    private readonly uuidService: UUIDServiceInterface
  ) {}
  async execute(input: CreatePointOfInterestUseCaseInput): Promise<void> {
    this.validate(input)

    await this.poiRepository.save({
      id: this.uuidService.generate(),
      name: input.name,
      xCoord: input.xCoord,
      yCoord: input.yCoord,
      createdAt: new Date(),
    })
  }

  validate(input: CreatePointOfInterestUseCaseInput): void {
    const { name, xCoord, yCoord } = input
    if (!isValidString(name)) {
      throw new InvalidParamError('name')
    }

    if (!isValidNumer(xCoord)) {
      throw new InvalidParamError('xCoord')
    }

    if (!isValidNumer(yCoord)) {
      throw new InvalidParamError('yCoord')
    }
  }
}
