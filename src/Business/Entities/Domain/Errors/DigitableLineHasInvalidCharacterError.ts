import { InvalidDataError } from '../../../Errors/InvalidDataError'

export class DigitableLineHasInvalidCharacterError extends InvalidDataError {
  constructor() {
    super('Digitable line has an invalid character.')
  }
}
