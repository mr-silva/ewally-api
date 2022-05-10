export interface ISpecificBankslip {
  /**
   * Retorna os dados de valor formatado para moeda.
   */
  getFormattedAmount(): number

  /**
   * Retorna data de vencimento do boleto formatado, caso exista no código de barras.
   */
  getExpirationDate(): Date | null
}
