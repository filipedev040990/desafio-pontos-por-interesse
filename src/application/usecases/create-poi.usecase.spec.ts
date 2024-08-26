import { CreatePOIUseCaseInput } from '@/domain/usecases/poi.types'
import { CreatePOIUseCase } from './create-poi.usecase'
import { InvalidParamError } from '@/shared/errors'
import { POIRepositoryInterface } from '@/domain/repositories/poi.interface'
import { UUIDServiceInterface } from '@/domain/services/uuid.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const poiRepository = mock<POIRepositoryInterface>()
const uuidService = mock<UUIDServiceInterface>()

describe('CreatePOIUseCase', () => {
  let sut: CreatePOIUseCase
  let input: CreatePOIUseCaseInput

  beforeEach(() => {
    sut = new CreatePOIUseCase(poiRepository, uuidService)
    input = {
      name: 'Any Point',
      xCoord: 20,
      yCoord: 10,
    }
    uuidService.generate.mockReturnValue('anyId')
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  test('should throw if name is not provided', async () => {
    input.name = null as any
    await expect(sut.execute(input)).rejects.toThrowError(new InvalidParamError('name'))
  })

  test('should throw if xCoord is not provided', async () => {
    input.xCoord = null as any
    await expect(sut.execute(input)).rejects.toThrowError(new InvalidParamError('xCoord'))
  })

  test('should throw if yCoord is not provided', async () => {
    input.yCoord = null as any
    await expect(sut.execute(input)).rejects.toThrowError(new InvalidParamError('yCoord'))
  })

  test('should call POIRepository.save once and with correct values', async () => {
    await sut.execute(input)
    expect(poiRepository.save).toHaveBeenCalledTimes(1)
    expect(poiRepository.save).toHaveBeenCalledWith({
      id: 'anyId',
      name: 'Any Point',
      xCoord: 20,
      yCoord: 10,
      createdAt: new Date(),
    })
  })
})
