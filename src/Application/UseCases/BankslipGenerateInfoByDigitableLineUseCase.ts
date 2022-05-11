import { Bankslip } from '../../Business/Entities/Domain/Bankslip'
import { BankslipValidator } from '../Validators/BankslipValidator'
import { BankslipTypeEnum } from '../../Business/Enums/BankslipTypeEnum'
import { BondsBankslip } from '../../Business/Entities/Domain/BondsBankslip'
import { CovenantBankslipSegmentEnum } from '../../Business/Enums/CovenantBankslipSegmentEnum'
import { CovenantBankslip } from '../../Business/Entities/Domain/CovenantBankslip'

export class BankslipGenerateInfoByDigitableLineUseCase {
  constructor(private readonly bankslipValidator: BankslipValidator) {}

  public execute(digitableLine: string): Bankslip {
    this.bankslipValidator.validateBankslipDigitableLine(digitableLine)

    const bankslipType =
      digitableLine.split('').length === 47 ? BankslipTypeEnum.BONDS : BankslipTypeEnum.COVENANT

    this.bankslipValidator.validateBankslipDigitableLineByType(digitableLine, bankslipType)

    const barCode = this.generateBarCodeByBankslipType(digitableLine, bankslipType)

    this.bankslipValidator.validateBankslipBarCodeLineByType(barCode, bankslipType)

    switch (bankslipType) {
      case BankslipTypeEnum.BONDS:
        return this.generateInfoFromBondsBankslip(barCode)

      case BankslipTypeEnum.COVENANT:
        return this.generateInfoFromConvenantBankslip(barCode)
    }
  }

  /**
   * Gera um código de barras a partir de uma linha digitável.
   *
   * @param {string} digitableLine
   */
  private generateBarCodeByBankslipType(
    digitableLine: string,
    bankslipType: BankslipTypeEnum
  ): string {
    switch (bankslipType) {
      case BankslipTypeEnum.BONDS:
        return String().concat(
          digitableLine.slice(0, 4),
          digitableLine.slice(32, 33),
          digitableLine.slice(33, 47),
          digitableLine.slice(4, 9),
          digitableLine.slice(10, 20),
          digitableLine.slice(21, 31)
        )

      case BankslipTypeEnum.COVENANT:
        return String().concat(
          digitableLine.slice(0, 11),
          digitableLine.slice(12, 23),
          digitableLine.slice(24, 35),
          digitableLine.slice(36, 47)
        )
    }
  }

  /**
   * Gera informações de um boleto de título pelo código de barras.
   *
   * @param {string} barCode
   * @returns {Bankslip}
   */
  private generateInfoFromBondsBankslip(barCode: string): Bankslip {
    const bondsBankslip = new BondsBankslip(
      barCode.slice(0, 3),
      barCode.slice(3, 4),
      barCode.slice(4, 5),
      barCode.slice(5, 9),
      barCode.slice(9, 19),
      barCode.slice(19, 44)
    )

    return new Bankslip(
      barCode,
      bondsBankslip.getFormattedAmount(),
      bondsBankslip.getExpirationDate()
    )
  }

  /**
   * Gera informações de um boleto de cocessionária pelo código de barras.
   *
   * @param {string} barCode
   * @returns {Bankslip}
   */
  private generateInfoFromConvenantBankslip(barCode: string): Bankslip {
    const segmentId = Number(barCode.slice(1, 2))

    let companyId: string = barCode.slice(15, 23)
    let freeField: string = barCode.slice(23, 44)

    if (segmentId === CovenantBankslipSegmentEnum.BANK_EXCLUSIVE_USE) {
      companyId = barCode.slice(15, 19)
      freeField = barCode.slice(19, 44)
    }

    const covenantBankslip = new CovenantBankslip(
      barCode.slice(0, 1),
      segmentId,
      barCode.slice(2, 3),
      barCode.slice(3, 4),
      barCode.slice(4, 15),
      companyId,
      freeField
    )

    return new Bankslip(
      barCode,
      covenantBankslip.getFormattedAmount(),
      covenantBankslip.getExpirationDate()
    )
  }
}
