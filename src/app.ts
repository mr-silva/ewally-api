import * as cors from 'cors'
import * as express from 'express'
import * as dotenv from 'dotenv'
import { ErrorHandler } from './Infra/Middlewares/ErrorHandlerMiddleware'
import { routes } from './Infra/Routes'

dotenv.config()

const app = express()
const errorHandler = new ErrorHandler()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routes)

app.use(errorHandler.error.bind(errorHandler))
app.use(errorHandler.notFound.bind(errorHandler))

export { app }
