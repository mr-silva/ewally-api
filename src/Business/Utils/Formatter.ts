export class Formatter {
  /**
   * Formata uma string de valor para um padrão de valor numérico.
   *
   * @param amount
   */
  public formatAmount(amount: string): number {
    const cents = amount.slice(-2)
    return Number(String().concat(amount.slice(0, -2), '.', cents))
  }
}
