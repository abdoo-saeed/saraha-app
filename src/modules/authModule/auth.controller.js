import { Router } from "express";
import * as authService from "./auth.service.js";
import { successRes } from "../../utils/res.handle.js";
import { auth } from "../../middlewares/auth.middleware.js";

//=================================================================================================


const router = Router();






router.get('/', (req, res, next) => {
    res.json({ msg: "hello from users module" })
})


router.post("/signUp",async (req,res,next)=>{

    const {username,password,email,gender,age,phone} = req.body
    const {data} = await authService.signUp({username,password,email,gender,age,phone})

    successRes({
        res,
        data,
        status:201
    })

})


router.post('/otp-verify', async(req,res,next) => {
  

    const result = await authService.verifyOTPService(req.body);

    successRes({
        res,
        data:result
    })
  
})





router.post("/login",async (req,res,next)=>{

    const {email,password} = req.body
    const {data} = await authService.login({email,password})

    successRes({
        res,
        data,
    })

})



router.get("/profile",auth,async (req,res,next)=>{
    
    

    successRes({
        res,
        data:req.user
    })

})



router.post('/refresh-Token',async (req,res,next)=>{

    const {data} = await authService.refreshToken({refreshToken:req.headers.authorization})
     console.log(data);
     

    return successRes({res,data})
})



export default router


