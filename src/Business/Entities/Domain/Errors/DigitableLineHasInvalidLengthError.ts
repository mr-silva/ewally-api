import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class DigitableLineHasInvalidLengthError extends InvalidDataError {
  constructor() {
    super('Digitable line must have 47 or 48 characters.')
  }
}
