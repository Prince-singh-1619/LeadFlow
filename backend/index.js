const dotenv = require("dotenv")
dotenv.config() 
const cors = require('cors')
const connectDB = require('./config/db')
const express = require('express')
const app = express()
const router = require("./routes/route")

const PORT = process.env.PORT || 8080

connectDB()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    // credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
}))
app.use(express.json())
// app.use(cookieParser())

app.use('/api', router)
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})