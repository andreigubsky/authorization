const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
const URL = process.env.URL

app.use(express.json())
app.use('/auth', authRouter)


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

const start = async () => {
    try{
        await mongoose.connect(`${URL}`)
        app.listen(port, () => {

            console.log(`server strart on port ${port}`)
          })
    }catch (e) {
        console.log(e)
    }
}



start()