import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class CovenantBankslipInvalidGeneralDVError extends InvalidDataError {
  constructor() {
    super('Invalid covenant bankslip general DV.')
  }
}
