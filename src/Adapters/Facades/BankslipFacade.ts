import { Bankslip } from '../../Business/Entities/Domain/Bankslip'
import { BankslipGenerateInfoByDigitableLineUseCase } from '../../Application/UseCases/BankslipGenerateInfoByDigitableLineUseCase'
import { BankslipValidator } from '../../Application/Validators/BankslipValidator'

export class BankslipFacade {
  public async generateInfoByDigitableLine(digitableLine: string): Promise<Bankslip> {
    const bankslipGenerateInfoByDigitableLineUseCase =
      new BankslipGenerateInfoByDigitableLineUseCase(new BankslipValidator())

    return bankslipGenerateInfoByDigitableLineUseCase.execute(digitableLine)
  }
}
