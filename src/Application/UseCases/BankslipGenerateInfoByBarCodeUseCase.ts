import { Bankslip } from '../../Business/Entities/Domain/Bankslip'
import { BankslipValidator } from '../Validators/BankslipValidator'
import { BankslipTypeEnum } from '../../Business/Enums/BankslipTypeEnum'
import { BondsBankslip } from '../../Business/Entities/Domain/BondsBankslip'
import { CovenantBankslipSegmentEnum } from '../../Business/Enums/CovenantBankslipSegmentEnum'
import { CovenantBankslip } from '../../Business/Entities/Domain/CovenantBankslip'

export class BankslipGenerateInfoByBarCodeUseCase {
  constructor(private readonly bankslipValidator: BankslipValidator) {}

  public execute(barCode: string): Bankslip {
    this.bankslipValidator.validateBankslipBarCode(barCode)

    const bankslipType =
      barCode.split('').length === 47 ? BankslipTypeEnum.BONDS : BankslipTypeEnum.COVENANT

    const cleanBarCode = this.clearBarCode(barCode, bankslipType)

    switch (bankslipType) {
      case BankslipTypeEnum.BONDS:
        return this.generateInfoFromBondsBankslip(cleanBarCode)

      case BankslipTypeEnum.COVENANT:
        return this.generateInfoFromConvenantBankslip(cleanBarCode)
    }
  }

  /**
   * Converte uma linha digitável de acordo com o tipo em código de barras com 44 carácteres.
   *
   * @param {string} barCode
   */
  private clearBarCode(barCode: string, bankslipType: BankslipTypeEnum): string {
    switch (bankslipType) {
      case BankslipTypeEnum.BONDS:
        return String().concat(
          barCode.slice(0, 4),
          barCode.slice(32, 33),
          barCode.slice(33, 47),
          barCode.slice(4, 9),
          barCode.slice(10, 20),
          barCode.slice(21, 31)
        )

      case BankslipTypeEnum.COVENANT:
        return String().concat(
          barCode.slice(0, 11),
          barCode.slice(12, 23),
          barCode.slice(24, 35),
          barCode.slice(36, 47)
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
    const segmentId = CovenantBankslipSegmentEnum[barCode.slice(1, 2)]

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
