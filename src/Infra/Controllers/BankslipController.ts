import { Request, Response, NextFunction } from 'express'
import { Factory } from '../../Adapters/Factories/Factory'
import { BankslipView } from '../../Adapters/Views/BankslipView'

export class BankslipController {
  public async generateInfoByBarCode(request: Request, response: Response, next: NextFunction) {
    try {
      const factory = new Factory()

      const result = await factory
        .buildFacadeFactory()
        .buildBankslipFacade()
        .generateInfoByBarCode(request.params.barCode)

      response.status(200).send(new BankslipView().render(result))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}
