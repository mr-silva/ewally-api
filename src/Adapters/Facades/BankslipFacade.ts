import { Bankslip } from '../../Business/Entities/Domain/Bankslip'
import { BankslipGenerateInfoByBarCodeUseCase } from '../../Application/UseCases/BankslipGenerateInfoByBarCodeUseCase'
import { BankslipValidator } from '../../Application/Validators/BankslipValidator'

export class BankslipFacade {
  public async generateInfoByBarCode(barCode: string): Promise<Bankslip> {
    const bankslipGenerateInfoByBarCodeUseCase = new BankslipGenerateInfoByBarCodeUseCase(
      new BankslipValidator()
    )

    return bankslipGenerateInfoByBarCodeUseCase.execute(barCode)
  }
}
