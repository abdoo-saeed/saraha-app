import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../../config/config.service.js'
import { errorRes } from '../utils/res.handle.js'
import { findById } from '../DB/db.repo.js'
import { userModel } from '../DB/models/userModel.js'



export const auth = async (req,res,next) =>{

    const authorization = req.headers.authorization

    const decoded = jwt.verify(authorization,TOKEN_SECRET_KEY)

    let user
    if(decoded._id){ 
         user =  await findById({
            model:userModel,
            id:decoded._id
         }) 

         console.log(decoded._id);
         
         if(!user){
            errorRes({ message:"user not found",status:404})
         }

    }else{
        errorRes({message:"in-valid token",status:409})
    }

    console.log(user);
    
    req.user = user
    next()

}