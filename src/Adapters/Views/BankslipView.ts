import { ViewContract } from '../Contracts/ViewContract'
import { Bankslip } from '../../Business/Entities/Domain/Bankslip'

export class BankslipView extends ViewContract<Bankslip, IBankslipView> {
  render(entity: Bankslip): IBankslipView {
    return {
      barCode: entity.getBarCode(),
      amount: entity.getAmount(),
      expirationDate: entity.getExpirationDate()
    }
  }
}

export interface IBankslipView {
  barCode: string
  amount: number
  expirationDate: Date
}
