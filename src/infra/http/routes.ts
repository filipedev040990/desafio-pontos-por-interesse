import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createPOIFactory } from '../factories/create-poi.factory'
import { getAllPOIFactory } from '../factories/get-all-poi.factory'

const router = Router()

router.post('/poi', expressRouteAdapter(createPOIFactory()))
router.get('/poi', expressRouteAdapter(getAllPOIFactory()))

export { router }
