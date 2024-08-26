import { HttpRequest } from '@/domain/controllers/controller.interface'
import { CreatePOIController } from './create-poi.controller'
import { mock } from 'jest-mock-extended'
import { CreatePOIUseCaseInterface } from '@/domain/usecases/create-poi.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'

const createPOIUseCase = mock<CreatePOIUseCaseInterface>()

describe('CreatePOIController', () => {
  let sut: CreatePOIController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreatePOIController(createPOIUseCase)
    input = {
      body: {
        name: 'Any Point',
        xCoord: 20,
        yCoord: 10,
      },
    }
  })
  test('should call CreatePOIUSeCase once and with correct values', async () => {
    await sut.execute(input)
    expect(createPOIUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createPOIUseCase.execute).toHaveBeenCalledWith(input.body)
  })

  test('should return a correct output on success', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 204, body: null })
  })

  test('should return a correct error if UseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    createPOIUseCase.execute.mockImplementationOnce(() => {
      throw error
    })
    const output = await sut.execute(input)
    expect(output).toEqual(badRequest(error))
  })
})
