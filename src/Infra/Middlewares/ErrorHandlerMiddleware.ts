import { NextFunction, Request, Response } from 'express'
import { AlreadyExistsError, DataNotFoundError, InvalidDataError } from '../../Business/Errors'

export class ErrorHandler {
  public notFound(request: Request, response: Response, next: NextFunction) {
    return this.error(
      new DataNotFoundError('Resource not found.').setCode('resourceNotFound'),
      request,
      response,
      next
    )
  }

  public error(error: Error, request: Request, response: Response, next: NextFunction) {
    let httpCode = 500
    let body = {
      code: `${httpCode}.internalServerError`,
      message: error.message,
      details: []
    }

    if (error instanceof DataNotFoundError) {
      httpCode = 404
      body = {
        ...body,
        code: `${httpCode}.${error.getCode()}`,
        details: error.getDetails()
      }
    } else if (error instanceof AlreadyExistsError) {
      httpCode = 409
      body = {
        ...body,
        code: `${httpCode}.${error.getCode()}`,
        details: error.getDetails()
      }
    } else if (error instanceof InvalidDataError) {
      httpCode = 422
      body = {
        ...body,
        code: `${httpCode}.${error.getCode()}`,
        details: error.getDetails()
      }
    }

    if (httpCode === 500) {
      console.error(error)
    }

    response.status(httpCode).json(body)
  }
}
