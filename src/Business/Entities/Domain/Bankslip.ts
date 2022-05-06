export class Bankslip {
  constructor(private barCode: string, private amount: number, private expirationDate: Date) {}

  public getBarCode(): string {
    return this.barCode
  }

  public getAmount(): number {
    return this.amount
  }

  public getExpirationDate(): Date {
    return this.expirationDate
  }
}
