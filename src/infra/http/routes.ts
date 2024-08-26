import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createPOIFactory } from '../factories/create-poi.factory'

const router = Router()

router.post('/poi', expressRouteAdapter(createPOIFactory()))

export { router }
