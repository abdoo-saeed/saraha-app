import { connect } from "mongoose"


export const DBConnection = async ()=>{

    await connect(process.env.DB_URI,{
        serverSelectionTimeoutMS:5000
    })
    .then(()=>{console.log("DB connected successfully")})
    .catch(()=>{console.log("DB can not connect")})
}