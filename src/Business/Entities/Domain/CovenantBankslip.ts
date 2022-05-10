import { Formatter } from '../../Utils/Formatter'
import { CovenantBankslipSegmentEnum } from '../../Enums/CovenantBankslipSegmentEnum'
import { ISpecificBankslip } from '../../Interfaces/ISpecificBankslip'

export class CovenantBankslip implements ISpecificBankslip {
  private readonly maxExpirationYear = Number(process.env.COVENANT_BANKSLIP_MAX_EXPIRATION_YEAR)

  constructor(
    private productId: string,
    private segmentId: CovenantBankslipSegmentEnum,
    private trueValueId: string,
    private barCodeVerificationDigit: string,
    private amount: string,
    private companyId: string,
    private freeField: string
  ) {}

  public getProductId(): string {
    return this.productId
  }

  public getSegmentId(): CovenantBankslipSegmentEnum {
    return this.segmentId
  }

  public getTrueValueId(): string {
    return this.trueValueId
  }

  public getBarCodeVerificationDigit(): string {
    return this.barCodeVerificationDigit
  }

  public getAmount(): string {
    return this.amount
  }

  public getCompanyId(): string {
    return this.companyId
  }

  public getFreeField(): string {
    return this.freeField
  }

  public getFormattedAmount(): number {
    return new Formatter().formatAmount(this.amount)
  }

  public getExpirationDate(): Date | null {
    const expirationDateData = this.freeField.slice(0, 8)

    const expirationYear = Number(expirationDateData.slice(0, 4))
    const expirationMonth = Number(expirationDateData.slice(4, 6))
    const expirationDay = Number(expirationDateData.slice(6, 8))

    if (expirationYear > this.maxExpirationYear) return null

    if (expirationMonth === 0) return null

    if (expirationDay > 31) return null

    return new Date(expirationYear, expirationMonth - 1, expirationDay)
  }
}
