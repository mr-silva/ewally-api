import { Formatter } from '../../Utils/Formatter'
import { ISpecificBankslip } from '../../Interfaces/ISpecificBankslip'

export class BondsBankslip implements ISpecificBankslip {
  private readonly expirationFactorDate = process.env.BONDS_BANKSLIP_FACTOR_DATE

  constructor(
    private bankCode: string,
    private currencyCode: string,
    private barCodeVerificationDigit: string,
    private expirationFactor: string,
    private amount: string,
    private freeField: string
  ) {}

  public getBankCode(): string {
    return this.bankCode
  }

  public getCurrencyCode(): string {
    return this.currencyCode
  }

  public getBarCodeVerificationDigit(): string {
    return this.barCodeVerificationDigit
  }

  public getExpirationFactor(): string {
    return this.expirationFactor
  }

  public getAmount(): string {
    return this.amount
  }

  public getFreeField(): string {
    return this.freeField
  }

  public getExpirationDate(): Date {
    let result = new Date(this.expirationFactorDate)
    result.setTime(result.getTime() + Number(this.expirationFactor) * 24 * 60 * 60 * 1000)
    return result
  }

  public getFormattedAmount(): number {
    return new Formatter().formatAmount(this.amount)
  }
}
