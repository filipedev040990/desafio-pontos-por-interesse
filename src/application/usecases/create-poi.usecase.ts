import { POIRepositoryInterface } from '@/domain/repositories/poi.interface'
import { UUIDServiceInterface } from '@/domain/services/uuid.interface'
import { CreatePOIUseCaseInterface } from '@/domain/usecases/create-poi.interface'
import { CreatePOIUseCaseInput } from '@/domain/usecases/poi.types'
import { InvalidParamError } from '@/shared/errors'
import { isValidNumer } from '@/shared/helpers/number.helper'
import { isValidString } from '@/shared/helpers/string.helper'

export class CreatePOIUseCase implements CreatePOIUseCaseInterface {
  constructor(
    private readonly poiRepository: POIRepositoryInterface,
    private readonly uuidService: UUIDServiceInterface
  ) {}
  async execute(input: CreatePOIUseCaseInput): Promise<void> {
    this.validate(input)

    await this.poiRepository.save({
      id: this.uuidService.generate(),
      name: input.name,
      xCoord: input.xCoord,
      yCoord: input.yCoord,
      createdAt: new Date(),
    })
  }

  validate(input: CreatePOIUseCaseInput): void {
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
