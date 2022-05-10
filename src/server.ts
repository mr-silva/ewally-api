import * as dotenv from 'dotenv'
import { app } from './app'

dotenv.config()

app.set('port', 8080)

app.listen(app.get('port'), async () => {
  console.info('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
})
