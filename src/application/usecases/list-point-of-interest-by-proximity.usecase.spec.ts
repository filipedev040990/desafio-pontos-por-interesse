import { PointOfInterestRepositoryInterface } from '@/domain/repositories/point-of-interest.interface'
import { ListPointOfInterestByProximityInput, PointOfInterestOutput } from '@/domain/usecases/point-of-interest.types'
import { mock } from 'jest-mock-extended'
import { ListPointOfInterestByProximityUseCase } from './list-point-of-interest-by-proximity.usecase'
import { InvalidParamError } from '@/shared/errors'
import MockDate from 'mockdate'

const poiRepository = mock<PointOfInterestRepositoryInterface>()
let fakePointOfInterests: PointOfInterestOutput[] | []

describe('ListPointOfInterestByProximityUseCase', () => {
  let sut: ListPointOfInterestByProximityUseCase
  let input: any

  beforeEach(() => {
    sut = new ListPointOfInterestByProximityUseCase(poiRepository)
    input = {
      xCoord: 20,
      yCoord: 10,
      dMax: 10,
    }
    fakePointOfInterests = [
      {
        id: '1',
        name: 'Lanchonete',
        xCoord: 27,
        yCoord: 12,
        createdAt: new Date(),
      },
      {
        id: '3',
        name: 'Joalheria',
        xCoord: 15,
        yCoord: 12,
        createdAt: new Date(),
      },
      {
        id: '5',
        name: 'Pub',
        xCoord: 12,
        yCoord: 8,
        createdAt: new Date(),
      },
      {
        id: '6',
        name: 'Supermercado',
        xCoord: 23,
        yCoord: 6,
        createdAt: new Date(),
      },
      {
        id: '7',
        name: 'Churrascaria',
        xCoord: 28,
        yCoord: 2,
        createdAt: new Date(),
      },
    ]
    poiRepository.getByProximity.mockResolvedValue(fakePointOfInterests)
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
    jest.clearAllMocks()
  })

  describe('execute', () => {
    test('should throw if any required field is invalid', async () => {
      const requiredFields: Array<keyof ListPointOfInterestByProximityInput> = ['xCoord', 'yCoord', 'dMax']
      for (const field of requiredFields) {
        const fieldBkp = input[field]
        input[field] = null
        await expect(sut.execute(input)).rejects.toThrowError(new InvalidParamError(field))
        input[field] = fieldBkp
      }
    })

    test('should call PointOfInterestRepository.getByProximity once and with correct values', async () => {
      await sut.execute(input)
      const xMin = 10
      const xMax = 30

      const yMin = 0
      const yMax = 20

      expect(poiRepository.getByProximity).toHaveBeenCalledTimes(1)
      expect(poiRepository.getByProximity).toHaveBeenCalledWith(xMin, xMax, yMin, yMax)
    })

    test('should return a correct response', async () => {
      const output = await sut.execute(input)
      expect(output).toEqual([
        {
          id: '1',
          name: 'Lanchonete',
          xCoord: 27,
          yCoord: 12,
          createdAt: new Date(),
        },
        {
          id: '3',
          name: 'Joalheria',
          xCoord: 15,
          yCoord: 12,
          createdAt: new Date(),
        },
        {
          id: '5',
          name: 'Pub',
          xCoord: 12,
          yCoord: 8,
          createdAt: new Date(),
        },
        {
          id: '6',
          name: 'Supermercado',
          xCoord: 23,
          yCoord: 6,
          createdAt: new Date(),
        },
      ])
    })
  })

  describe('calculateDistance', () => {
    test('should return 7.28', () => {
      const reference = {
        xCoord: 20,
        yCoord: 10,
      }
      const poi = {
        xCoord: 27,
        yCoord: 12,
      }
      const distance = sut.calculateDistance(reference, poi)
      expect(distance).toBeCloseTo(7.28)
    })

    test('should return 42.4264', () => {
      const reference = {
        xCoord: 50,
        yCoord: 40,
      }
      const poi = {
        xCoord: 20,
        yCoord: 10,
      }
      const distance = sut.calculateDistance(reference, poi)
      expect(distance).toBeCloseTo(42.42640687119285)
    })
  })
})

//Distância Euclideana: √((x1 – x2)² + (y1 – y2)²).
