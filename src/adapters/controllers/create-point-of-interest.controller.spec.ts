import { HttpRequest } from '@/domain/controllers/controller.interface'
import { CreatePointOfInterestController } from './create-point-of-interest.controller'
import { mock } from 'jest-mock-extended'
import { CreatePointOfInterestUseCaseInterface } from '@/domain/usecases/create-point-of-interest.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'

const createPointOfInterestUseCase = mock<CreatePointOfInterestUseCaseInterface>()

describe('CreatePointOfInterestController', () => {
  let sut: CreatePointOfInterestController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreatePointOfInterestController(createPointOfInterestUseCase)
    input = {
      body: {
        name: 'Any Point',
        xCoord: 20,
        yCoord: 10
      }
    }
  })
  test('should call CreatePointOfInterestUSeCase once and with correct values', async () => {
    await sut.execute(input)
    expect(createPointOfInterestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createPointOfInterestUseCase.execute).toHaveBeenCalledWith(input.body)
  })

  test('should return a correct output on success', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 204, body: null })
  })

  test('should return a correct error if UseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    createPointOfInterestUseCase.execute.mockImplementationOnce(() => {
      throw error
    })
    const output = await sut.execute(input)
    expect(output).toEqual(badRequest(error))
  })
})
