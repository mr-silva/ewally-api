import { BankslipFacade } from '../Facades/BankslipFacade'

export class FacadeFactory {
  public buildBankslipFacade() {
    return new BankslipFacade()
  }
}
