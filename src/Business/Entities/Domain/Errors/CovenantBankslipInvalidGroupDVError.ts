import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class CovenantBankslipInvalidGroupDVError extends InvalidDataError {
  constructor(readonly group: number) {
    super(`Invalid covenant bankslip DV in group ${group}.`)
  }
}
