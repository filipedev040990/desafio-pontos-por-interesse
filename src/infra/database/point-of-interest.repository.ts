import { PointOfInterestRepositoryInterface } from "@/domain/repositories/point-of-interest.interface"
import { CreatePointOfInterestRepositoryInput, PointOfInterestOutput } from "@/domain/usecases/point-of-interest.types"
import { prismaClient } from "./prisma-client"

export class PointOfInterestRepository implements PointOfInterestRepositoryInterface {
  async save(data: CreatePointOfInterestRepositoryInput): Promise<void> {
    await prismaClient.pointOfInterest.create({ data })
  }

  async getAll(): Promise<PointOfInterestOutput[] | []> {
    return await prismaClient.pointOfInterest.findMany()
  }

  async getByProximity(xMin: number, xMax: number, yMin: number, yMax: number): Promise<PointOfInterestOutput[] | []> {
    return await prismaClient.pointOfInterest.findMany({
      where: {
        AND: [
          {
            xCoord: {
              gte: xMin
            }
          },
          {
            xCoord: {
              lte: xMax
            }
          },
          {
            yCoord: {
              gte: yMin
            }
          },
          {
            yCoord: {
              lte: yMax
            }
          }
        ]
      }
    })
  }
}
