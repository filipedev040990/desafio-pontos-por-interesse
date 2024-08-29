import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { GetAllPointOfInterestController } from './get-all-point-of-interest.controller'
import { GetAllPointOfInterestUseCaseInterface } from '@/domain/usecases/get-all-point-of-interest.interface'

const getAllPointOfInterestUseCase = mock<GetAllPointOfInterestUseCaseInterface>()
const fakesPointOfInterest = [
  {
    id: 'any',
    name: 'anyPointOfInterest',
    xCoord: 50,
    yCoord: 30,
    createdAt: new Date()
  },
  {
    id: 'another',
    name: 'anotherPointOfInterest',
    xCoord: 40,
    yCoord: 20,
    createdAt: new Date()
  }
]

describe('GetAllPointOfInterestController', () => {
  let sut: GetAllPointOfInterestController

  beforeEach(() => {
    sut = new GetAllPointOfInterestController(getAllPointOfInterestUseCase)
    getAllPointOfInterestUseCase.execute.mockResolvedValue(fakesPointOfInterest)
  })
  test('should call getAllPointOfInterestUSeCase once and with correct values', async () => {
    await sut.execute()
    expect(getAllPointOfInterestUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getAllPointOfInterestUseCase.execute).toHaveBeenCalledWith()
  })

  test('should return a correct output on success', async () => {
    const output = await sut.execute()
    expect(output).toEqual({ statusCode: 200, body: fakesPointOfInterest })
  })

  test('should return a correct error if UseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    getAllPointOfInterestUseCase.execute.mockImplementationOnce(() => {
      throw error
    })
    const output = await sut.execute()
    expect(output).toEqual(badRequest(error))
  })
})
