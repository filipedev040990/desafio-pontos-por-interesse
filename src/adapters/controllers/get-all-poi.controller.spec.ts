import { HttpRequest } from '@/domain/controllers/controller.interface'
import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { GetAllPOIController } from './get-all-poi.controller'
import { GetAllPOIUseCaseInterface } from '@/domain/usecases/get-all-poi.interface'

const getAllPOIUseCase = mock<GetAllPOIUseCaseInterface>()
const fakesPOI = [
  {
    id: 'any',
    name: 'anyPOI',
    xCoord: 50,
    yCoord: 30,
    createdAt: new Date(),
  },
  {
    id: 'another',
    name: 'anotherPOI',
    xCoord: 40,
    yCoord: 20,
    createdAt: new Date(),
  },
]

describe('GetAllPOIController', () => {
  let sut: GetAllPOIController

  beforeEach(() => {
    sut = new GetAllPOIController(getAllPOIUseCase)
    getAllPOIUseCase.execute.mockResolvedValue(fakesPOI)
  })
  test('should call getAllPOIUSeCase once and with correct values', async () => {
    await sut.execute()
    expect(getAllPOIUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getAllPOIUseCase.execute).toHaveBeenCalledWith()
  })

  test('should return a correct output on success', async () => {
    const output = await sut.execute()
    expect(output).toEqual({ statusCode: 200, body: fakesPOI })
  })

  test('should return a correct error if UseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    getAllPOIUseCase.execute.mockImplementationOnce(() => {
      throw error
    })
    const output = await sut.execute()
    expect(output).toEqual(badRequest(error))
  })
})
