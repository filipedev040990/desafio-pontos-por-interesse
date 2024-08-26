import { CreatePOIRepositoryInput, POIOutput } from '../usecases/poi.types'

export interface POIRepositoryInterface {
  save: (input: CreatePOIRepositoryInput) => Promise<void>
  getAll: () => Promise<POIOutput[] | []>
}
