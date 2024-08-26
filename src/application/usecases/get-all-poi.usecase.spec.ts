import { mock } from 'jest-mock-extended'
import { GetAllPOIUseCase } from './get-all-poi.usecase'
import { POIRepositoryInterface } from '@/domain/repositories/poi.interface'
import { POIOutput } from '@/domain/usecases/poi.types'

const poiRepository = mock<POIRepositoryInterface>()

describe('GetAllPOIUseCase', () => {
  let sut: GetAllPOIUseCase

  beforeEach(() => {
    sut = new GetAllPOIUseCase(poiRepository)
  })

  test('should call POIRepository.getAll once', async () => {
    await sut.execute()
    expect(poiRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should return a correct response', async () => {
    const response: POIOutput[] | [] = [
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
    poiRepository.getAll.mockResolvedValueOnce(response)
    expect(await sut.execute()).toEqual(response)
  })

  test('should return a correct response', async () => {
    const response: POIOutput[] | [] = []
    poiRepository.getAll.mockResolvedValueOnce(response)
    expect(await sut.execute()).toEqual([])
  })
})
