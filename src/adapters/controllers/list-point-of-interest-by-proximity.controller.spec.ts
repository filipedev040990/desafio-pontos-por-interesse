import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { ListPointOfInterestByProximityController } from './list-point-of-interest-by-proximity.controller'
import { ListPointOfInterestByProximityUseCaseInterface } from '@/domain/usecases/list-point-of-interest-by-proximity.interface'
import { HttpRequest } from '@/domain/controllers/controller.interface'

const listPointOfInterestByProximityUseCase = mock<ListPointOfInterestByProximityUseCaseInterface>()
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

describe('ListPointOfInterestByProximityController', () => {
  let sut: ListPointOfInterestByProximityController
  let input: HttpRequest

  beforeEach(() => {
    sut = new ListPointOfInterestByProximityController(listPointOfInterestByProximityUseCase)
    input = {
      query: {
        xCoord: 20,
        yCoord: 10,
        dMax: 10
      }
    }
    listPointOfInterestByProximityUseCase.execute.mockResolvedValue(fakesPointOfInterest)
  })
  test('should call listPointOfInterestByProximityUSeCase once and with correct values', async () => {
    await sut.execute(input)
    expect(listPointOfInterestByProximityUseCase.execute).toHaveBeenCalledTimes(1)
    expect(listPointOfInterestByProximityUseCase.execute).toHaveBeenCalledWith(input.query)
  })

  test('should return a correct output on success', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: fakesPointOfInterest })
  })

  test('should return a correct error if UseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    listPointOfInterestByProximityUseCase.execute.mockImplementationOnce(() => {
      throw error
    })
    const output = await sut.execute(input)
    expect(output).toEqual(badRequest(error))
  })
})
