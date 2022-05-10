import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class BarCodeHasInvalidCharacterError extends InvalidDataError {
  constructor() {
    super('Bar code has an invalid character.')
  }
}
