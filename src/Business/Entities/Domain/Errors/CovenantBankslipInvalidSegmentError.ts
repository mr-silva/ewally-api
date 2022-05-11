import { InvalidDataError } from '../../../Errors/InvalidDataError'
import { CovenantBankslipSegmentEnum } from '../../../Enums/CovenantBankslipSegmentEnum'

export class CovenantBankslipInvalidSegmentError extends InvalidDataError {
  constructor(
    readonly segment = Object.keys(CovenantBankslipSegmentEnum).filter(k => !isNaN(Number(k)))
  ) {
    super('Covenant bankslip invalid segment.', [
      {
        id: 'invalid.segment',
        message: `Segment must be either ${segment}.`,
        enum: segment
      }
    ])
  }
}
