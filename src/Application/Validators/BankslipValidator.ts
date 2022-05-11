import { DigitableLineHasInvalidCharacterError } from '../../Business/Entities/Domain/Errors/DigitableLineHasInvalidCharacterError'
import { DigitableLineHasInvalidLengthError } from '../../Business/Entities/Domain/Errors/DigitableLineHasInvalidLengthError'
import { CovenantBankslipInvalidGroupDVError } from '../../Business/Entities/Domain/Errors/CovenantBankslipInvalidGroupDVError'
import { BankslipTypeEnum } from '../../Business/Enums/BankslipTypeEnum'
import { CovenantBankslipEffectiveValueModuleCalculationEnum } from '../../Business/Enums/CovenantBanksliptEffectiveValueModuleCalculationEnum'
import { BankslipDigitChecker } from '../Utils/BankslipDigitChecker'
import { BondsBankslipInvalidGroupDVError } from '../../Business/Entities/Domain/Errors/BondsBankslipInvalidGroupDVError'
import { BondsBankslipInvalidGeneralDVError } from '../../Business/Entities/Domain/Errors/BondsBankslipInvalidGeneralDVError'
import { CovenantBankslipInvalidEffectiveValueError } from '../../Business/Entities/Domain/Errors/CovenantBankslipInvalidEffectiveValueError'
import { CovenantBankslipSegmentEnum } from '../../Business/Enums/CovenantBankslipSegmentEnum'
import { CovenantBankslipInvalidSegmentError } from '../../Business/Entities/Domain/Errors/CovenantBankslipInvalidSegmentError'

export class BankslipValidator {
  public validateBankslipDigitableLine(digitableLine: string): void {
    digitableLine.split('').forEach(digit => {
      if (Number.isNaN(Number(digit))) throw new DigitableLineHasInvalidCharacterError()

      if (!digit.trim().length) throw new DigitableLineHasInvalidCharacterError()
    })

    if (digitableLine.split('').length < 47 || digitableLine.split('').length > 48)
      throw new DigitableLineHasInvalidLengthError()
  }

  public validateBankslipDigitableLineByType(
    digitableLine: string,
    bankslipType: BankslipTypeEnum
  ) {
    switch (bankslipType) {
      case BankslipTypeEnum.BONDS:
        this.validateBondsGroupCheckerDigitByModule10(digitableLine)
        break

      case BankslipTypeEnum.COVENANT:
        this.validateCovenantSegment(digitableLine)

        const effectiveValue = this.getEffectiveValue(digitableLine)

        switch (effectiveValue) {
          case CovenantBankslipEffectiveValueModuleCalculationEnum.BRL_TRUE_VALUE_MODULE_10:
          case CovenantBankslipEffectiveValueModuleCalculationEnum.COIN_QUANTITY_MODULE_10:
            this.validateCovenentGroupCheckerDigitByModule10(digitableLine)
            break

          case CovenantBankslipEffectiveValueModuleCalculationEnum.BRL_TRUE_VALUE_MODULE_11:
          case CovenantBankslipEffectiveValueModuleCalculationEnum.COIN_QUANTITY_MODULE_11:
            this.validateCovenentGroupCheckerDigitByModule11(digitableLine)
            break
        }
        break
    }
  }

  public validateBankslipBarCodeLineByType(barCode: string, bankslipType: BankslipTypeEnum): void {
    switch (bankslipType) {
      case BankslipTypeEnum.BONDS:
        this.validateBondBankslipBarCodeGeneralVerificationDigit(barCode)
        break

      case BankslipTypeEnum.COVENANT:
        break
    }
  }

  private validateBondBankslipBarCodeGeneralVerificationDigit(barCode: string): void {
    const splittedBarCode = barCode.split('')
    const dac = Number(splittedBarCode.splice(4, 1))

    const barCodeToCalculate = splittedBarCode.join('')

    if (dac !== new BankslipDigitChecker().module11(barCodeToCalculate, BankslipTypeEnum.BONDS))
      throw new BondsBankslipInvalidGeneralDVError()
  }

  private validateCovenentGroupCheckerDigitByModule10(digitableLine: string): void {
    const digitGroups = [
      digitableLine.slice(0, 12),
      digitableLine.slice(12, 24),
      digitableLine.slice(24, 36),
      digitableLine.slice(36, 48)
    ]

    digitGroups.forEach((digitGroup, i) => {
      const dac = Number(digitGroup.slice(-1))

      if (dac !== new BankslipDigitChecker().module10(digitGroup.slice(0, 11)))
        throw new CovenantBankslipInvalidGroupDVError(i + 1)
    })
  }

  private validateBondsGroupCheckerDigitByModule10(digitableLine: string): void {
    const digitGroups = [
      digitableLine.slice(0, 10),
      digitableLine.slice(10, 21),
      digitableLine.slice(21, 32)
    ]

    digitGroups.forEach((digitGroup, i) => {
      const dac = Number(digitGroup.slice(-1))

      const validDigitGroup = i === 0 ? digitGroup.slice(0, 9) : digitGroup.slice(0, 10)

      if (dac !== new BankslipDigitChecker().module10(validDigitGroup))
        throw new BondsBankslipInvalidGroupDVError(i + 1)
    })
  }

  private getEffectiveValue(barCodeOrDigitableLine: string): number {
    if (
      !CovenantBankslipEffectiveValueModuleCalculationEnum[
        Number(barCodeOrDigitableLine.slice(2, 3))
      ]
    )
      throw new CovenantBankslipInvalidEffectiveValueError()

    return Number(barCodeOrDigitableLine.slice(2, 3))
  }

  private validateCovenantSegment(digitableLine: string): void {
    if (!CovenantBankslipSegmentEnum[Number(digitableLine.slice(1, 2))])
      throw new CovenantBankslipInvalidSegmentError()
  }

  private validateCovenentGroupCheckerDigitByModule11(digitableLine: string): void {
    const digitGroups = [
      digitableLine.slice(0, 12),
      digitableLine.slice(12, 24),
      digitableLine.slice(24, 36),
      digitableLine.slice(36, 48)
    ]

    digitGroups.forEach((digitGroup, i) => {
      const dac = Number(digitGroup.slice(-1))

      if (dac !== new BankslipDigitChecker().module11(digitGroup, BankslipTypeEnum.COVENANT))
        throw new CovenantBankslipInvalidGroupDVError(i + 1)
    })
  }
}
