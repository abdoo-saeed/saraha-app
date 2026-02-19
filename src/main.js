import express from 'express'
import userRouter from './modules/userModule/user.controller.js'
import authRouter from './modules/authModule/auth.controller.js'
import { DBConnection } from './DB/db.connection.js'
// import { config } from 'dotenv'
// import path from 'node:path'
// config({ path: path.resolve('.', 'config/.env') })

const main = async () => {
    const app = express()
    app.use(express.json())
    const PORT = process.env.PORT

  await DBConnection()


    app.use("/auth",authRouter)
    app.use("/users", userRouter)
    

 



    




    
    app.all('{/*dummy}', (req, res, next) => {
        throw new Error(`page ${req.url} with method ${req.method} not found`)
    })

    app.use((err, req, res, next) => {
        if (err) {
            res.status(err.cause?.status || 500).json({
                status: err.cause?.status || 500,
                errMsg: err.message,
                stack: err.stack
            });
        }
    })

    app.listen(PORT, () => {
        console.log("server running on port=> ", PORT);
    })

}


export default main