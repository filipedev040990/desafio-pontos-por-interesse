import { POIRepositoryInterface } from '@/domain/repositories/poi.interface'
import { CreatePOIRepositoryInput, POIOutput } from '@/domain/usecases/poi.types'
import { prismaClient } from './prisma-client'

export class POIRepository implements POIRepositoryInterface {
  async save(data: CreatePOIRepositoryInput): Promise<void> {
    await prismaClient.pointOfInterest.create({ data })
  }

  async getAll(): Promise<POIOutput[] | []> {
    return await prismaClient.pointOfInterest.findMany()
  }
}
