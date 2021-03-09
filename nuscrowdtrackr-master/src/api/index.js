import { Router } from 'express'

import getDataRouter from './scraping'

const router = new Router()

router.use('/getData', getDataRouter)

export default router
