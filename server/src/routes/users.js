import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js";

const router = express.Router()

router.post('/register', async (req, res) => { 
    const { username, password } = req.body

    const user = await UserModel.findOne({ username })
    if(user) return res.json({message: 'User already exists!'})
    
    const hashPass = await bcrypt.hash(password, 10)
    const newUser = new UserModel({ username, password: hashPass})
    await newUser.save()
    res.json({message: 'User added'})
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username })

    if(!user) return res.json({ message: 'No such user'})

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) return res.json({ message: 'Username or Password Incorrect' })

    const token = jwt.sign({ id: user._id }, 'secret') //create login token. use .env variable instead of "secret"
    res.json({ token, userID: user._id })

})

export { router as userRouter }