import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class CovenantBankslipInvalidSegmentError extends InvalidDataError {
  constructor() {
    super('Covenant bankslip invalid segment.', [
      {
        id: 'invalid.segment',
        message: 'Segment must be either "1", "2", "3", "4", "5", "6", "7" or "9".',
        enum: ['1', '2', '3', '4', '5', '6', '7', '9']
      }
    ])
  }
}
