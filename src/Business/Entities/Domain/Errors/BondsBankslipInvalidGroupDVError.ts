import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class BondsBankslipInvalidGroupDVError extends InvalidDataError {
  constructor(readonly group: number) {
    super(`Invalid bond bankslip DV in group ${group}.`)
  }
}
