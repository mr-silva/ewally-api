import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class CovenantBankslipInvalidEffectiveValueError extends InvalidDataError {
  constructor() {
    super('Covenant bankslip invalid effective value.', [
      {
        id: 'invalid.effective.value',
        message: 'Effective value must be either "6", "7", "8" or "9".',
        enum: ['6', '7', '8', '9']
      }
    ])
  }
}
