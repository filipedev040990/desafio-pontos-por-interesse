import { UUIDServiceInterface } from '@/domain/services/uuid.interface'
import { randomUUID } from 'crypto'

export class UUIDService implements UUIDServiceInterface {
  generate(): string {
    return randomUUID()
  }
}
