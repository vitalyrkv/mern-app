import express from 'express' //framework to create API
import cors from 'cors' //set up the rules of communication bw the f-e and b-e
import mongoose from 'mongoose' //ORM, map object in the code to documents inside the mongodb
import * as dotenv from 'dotenv'

import { userRouter } from './routes/users.js'

dotenv.config()
const app = express()
app.use(express.json()) //convert data from f-e to json
app.use(cors())
app.use('/auth', userRouter) //all endpoints related to authentication 

mongoose.connect(process.env.DB_LOGIN)


app.listen(3001, () => console.log('Server started'))






 