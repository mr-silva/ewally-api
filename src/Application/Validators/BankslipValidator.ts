import { BarCodeHasInvalidCharacterError } from '../../Business/Entities/Domain/Errors/BarCodeHasInvalidCharacterError'
import { BarCodeHasInvalidLengthError } from '../../Business/Entities/Domain/Errors/BarCodeHasInvalidLengthError'

export class BankslipValidator {
  public validateBankslipBarCode(barCode: string): void {
    barCode.split('').forEach(digit => {
      if (Number.isNaN(Number(digit))) throw new BarCodeHasInvalidCharacterError()

      if (!digit.trim().length) throw new BarCodeHasInvalidCharacterError()
    })

    if (barCode.split('').length < 47 || barCode.split('').length > 48)
      throw new BarCodeHasInvalidLengthError()
  }
}
