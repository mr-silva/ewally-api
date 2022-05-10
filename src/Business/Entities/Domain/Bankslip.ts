export class Bankslip {
  constructor(
    private barCode: string,
    private amount: number,
    private expirationDate: Date | null
  ) {}

  public getBarCode(): string {
    return this.barCode
  }

  public getAmount(): number {
    return this.amount
  }

  public getExpirationDate(): Date | null {
    return this.expirationDate
  }
}
