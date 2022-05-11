import { Router } from 'express'
import { BankslipController } from '../Controllers/BankslipController'

const bankslipRouter = Router()
const bankslipController = new BankslipController()

bankslipRouter
  .route('/:digitableLine')
  .get(bankslipController.generateInfoByDigitableLine.bind(bankslipController))

export { bankslipRouter }
