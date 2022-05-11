import { BankslipTypeEnum } from '../../Business/Enums/BankslipTypeEnum'

export class BankslipDigitChecker {
  /**
   * Realiza o cálculo do dígito de verificação com base nas regras de módulo 10.
   *
   * @param {string} digitGroup Grupo de digitos para realizar o cálulo do dígito de verificação.
   * @returns {number} Retorna o dígito de verificação.
   */
  public module10(digitGroup: string): number {
    let multiplier = 2
    let acc = 0
    let calculate = []

    for (const digit of digitGroup.split('').reverse()) {
      acc = multiplier * Number(digit)

      if (acc > 9) calculate.push(...acc.toString().split('').map(Number))
      else calculate.push(acc)

      multiplier++

      if (multiplier > 2) multiplier = 1
    }

    const total = calculate.reduce((prev, curr) => prev + curr, 0)

    const rest = total % 10
    const dv = rest === 0 ? rest : 10 - rest

    return dv
  }

  /**
   * Realiza o cálculo do dígito de verificação com base nas regras de módulo 11.
   *
   * @param {string} digitGroup Grupo de digitos para realizar o cálulo do dígito de verificação.
   * @param {BankslipTypeEnum} bankslipType Tipo do boleto para realizar o cálculo.
   * @returns {number} Retorna o dígito de verificação.
   */
  public module11(digitGroup: string, bankslipType: BankslipTypeEnum): number {
    let multiplier = 2
    let total = 0

    for (const digit of digitGroup.split('').reverse()) {
      total += multiplier * Number(digit)
      multiplier++
      if (multiplier > 9) multiplier = 2
    }

    const rest = total % 11
    const partialDv = 11 - rest

    if (bankslipType === BankslipTypeEnum.COVENANT)
      return rest === 0 || rest === 1 ? 0 : rest === 10 ? 1 : partialDv

    return partialDv === 0 || partialDv === 10 || partialDv === 11 ? 1 : partialDv
  }
}
