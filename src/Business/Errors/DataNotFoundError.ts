import { BaseError } from './BaseError'

export class DataNotFoundError extends BaseError {
  constructor(message: string = 'Item not found.') {
    super(message)
  }
}
