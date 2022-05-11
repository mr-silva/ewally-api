import { InvalidDataError } from '../../../Errors/InvalidDataError'
import { CovenantBankslipEffectiveValueModuleCalculationEnum } from '../../../Enums/CovenantBanksliptEffectiveValueModuleCalculationEnum'

export class CovenantBankslipInvalidEffectiveValueError extends InvalidDataError {
  constructor(
    readonly effectiveValueEnumValue = Object.keys(
      CovenantBankslipEffectiveValueModuleCalculationEnum
    ).filter(k => !isNaN(Number(k)))
  ) {
    super('Covenant bankslip invalid effective value.', [
      {
        id: 'invalid.effective.value',
        message: `Effective value must be either ${effectiveValueEnumValue}.`,
        enum: effectiveValueEnumValue
      }
    ])
  }
}
