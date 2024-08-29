import { GetAllPointOfInterestUseCase } from './get-all-point-of-interest.usecase'
import { PointOfInterestRepositoryInterface } from '@/domain/repositories/point-of-interest.interface'
import { PointOfInterestOutput } from '@/domain/usecases/point-of-interest.types'
import { mock } from 'jest-mock-extended'

const poiRepository = mock<PointOfInterestRepositoryInterface>()

describe('GetAllPointOfInterestUseCase', () => {
  let sut: GetAllPointOfInterestUseCase

  beforeEach(() => {
    sut = new GetAllPointOfInterestUseCase(poiRepository)
  })

  test('should call PointOfInterestRepository.getAll once', async () => {
    await sut.execute()
    expect(poiRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should return a correct response', async () => {
    const response: PointOfInterestOutput[] | [] = [
      {
        id: 'any',
        name: 'anyPointOfInterest',
        xCoord: 50,
        yCoord: 30,
        createdAt: new Date(),
      },
      {
        id: 'another',
        name: 'anotherPointOfInterest',
        xCoord: 40,
        yCoord: 20,
        createdAt: new Date(),
      },
    ]
    poiRepository.getAll.mockResolvedValueOnce(response)
    expect(await sut.execute()).toEqual(response)
  })

  test('should return a correct response', async () => {
    const response: PointOfInterestOutput[] | [] = []
    poiRepository.getAll.mockResolvedValueOnce(response)
    expect(await sut.execute()).toEqual([])
  })
})
