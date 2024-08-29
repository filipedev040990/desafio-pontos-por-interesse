import { Router } from 'express'
import { expressRouteAdapter } from '../tools/express'
import { createPointOfInterestFactory } from '../factories/create-point-of-interest.factory'
import { getAllPointOfInterestFactory } from '../factories/get-all-point-of-interest.factory'
import { listPointOfInterestByProximityFactory } from '../factories/list-point-of-interest.factory'

const router = Router()

router.post('/poi', expressRouteAdapter(createPointOfInterestFactory()))
router.get('/poi/proximity', expressRouteAdapter(listPointOfInterestByProximityFactory()))
router.get('/poi', expressRouteAdapter(getAllPointOfInterestFactory()))

export { router }
