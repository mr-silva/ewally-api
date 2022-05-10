import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class BarCodeHasInvalidLengthError extends InvalidDataError {
  constructor() {
    super('Bar code must have 47 or 48 characters.')
  }
}
