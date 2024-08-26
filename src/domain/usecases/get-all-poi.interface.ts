import { POIOutput } from './poi.types'

export interface GetAllPOIUseCaseInterface {
  execute: () => Promise<POIOutput[] | []>
}
