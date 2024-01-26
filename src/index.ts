import express, { type Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
