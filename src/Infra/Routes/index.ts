import { Router } from 'express'
import { bankslipRouter } from './Bankslip.routes'

const routes = Router()

routes.use('/boleto', bankslipRouter)

export { routes }
