import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import ApiError from './utils/ApiError.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",userRoutes)

app.use((err ,req,res,next)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            message:err.message
        })
    }

    res.status(500).json({
        message:"Internal server error",
        error:err.message
    })

})

export default app;