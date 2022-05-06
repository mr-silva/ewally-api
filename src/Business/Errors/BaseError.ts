import { IErrorDetail } from '../Interfaces/IErrorDetail'

export class BaseError extends Error {
  private code: string

  constructor(public message: string, private details: IErrorDetail[] = []) {
    super()
  }

  public addDetail(detail: IErrorDetail): this {
    this.details.push(detail)
    return this
  }

  public setMessage(message: string): this {
    this.message = message
    return this
  }

  public setCode(code: string): this {
    this.code = code
    return this
  }

  public getMessage(): string {
    return this.message
  }

  public getDetails(): IErrorDetail[] {
    return this.details
  }

  public getCode(): string {
    if (!this.code)
      return `${this.constructor.name
        .substring(0, 1)
        .toLowerCase()}${this.constructor.name.substring(1)}`

    return this.code
  }
}
