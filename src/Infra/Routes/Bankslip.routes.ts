import { Router } from 'express'
import { BankslipController } from '../Controllers/BankslipController'

const bankslipRouter = Router()
const bankslipController = new BankslipController()

bankslipRouter
  .route('/:barCode')
  .get(bankslipController.generateInfoByBarCode.bind(bankslipController))

export { bankslipRouter }
