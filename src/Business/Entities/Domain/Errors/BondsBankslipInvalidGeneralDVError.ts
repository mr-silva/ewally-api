import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class BondsBankslipInvalidGeneralDVError extends InvalidDataError {
  constructor() {
    super('Invalid bond bankslip general DV.')
  }
}
