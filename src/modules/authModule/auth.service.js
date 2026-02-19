import { findById, findOne } from "../../DB/db.repo.js"
import { userModel } from "../../DB/models/userModel.js"
import { errorRes } from "../../utils/res.handle.js"
import { compare, hash } from "../../utils/security/hash.security.js"
import { findByEmail } from "./user.repo.js"
import { generateDncryption, generateEncryption } from "../../utils/security/encryption.security.js"
import { generateToken, verifyToken } from "../../utils/security/token.security.js"
import { generateOTP, sendEmail } from "../../utils/security/otp.security.js"

//=====================================================================================





export const signUp = async ({username,password,email,gender,age,phone})=>{

    const isEmailExist = await findOne(
        {
            model:userModel,
            filter:{email},

        }
    )
    if(isEmailExist){
        errorRes({message:"email already exist",status:400})
    }
 

    const hashedPass =await hash({text: password , target: "argon2"})//to hash the password

    const otp = generateOTP();

    const user = await userModel.create({
            username,
            password:hashedPass,
            email,
            gender,
            age,
            phone:await generateEncryption(phone),
            otp,
            otpExpires: Date.now() + 5 * 60 * 1000, // 10 minutes
        })

        await sendEmail({
            to: email,
            subject: "Verify Your Account",
            message: otp
        });  
        
        
    return {
        data:{
            message:"User created. Please verify OTP sent to email."
        }
    }
} 




export const verifyOTPService = async ({ email, otp }) => {

  const user = await findByEmail({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Account already verified");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpires < Date.now()) {
    throw new Error("OTP expired");
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;

  await user.save();

  return {
    data:{
        user,
        message: "Account verified successfully"
    }
    
  };
};








export const login = async({email,password})=>{
    const user = await findByEmail({email , select:"firstName lastName username  password phone"})
    if(!user){
        errorRes({
            message:"in_valid credentials"
        })
    }
    if(!(await compare({text: password ,cipherText: user.password ,target: 'argon2'}))){
        errorRes({ 
            message:"in_valid credentials"
        })
    }

    user.phone = await generateDncryption(user.phone)



    const accessToken = generateToken({
        payload:{_id:user._id},
        options:{expiresIn:30*60}

    }) 

    const refreshToken = generateToken({
        payload:{_id:user._id},
        options:{expiresIn:'1W'},
        tokenType: 'refresh' 

    }) 

  
    // console.log(accessToken);
    
    return{
        data:{
        accessToken,
        refreshToken
        }

    }
}


export const refreshToken = async({refreshToken})=>{

    
    const decoded = verifyToken({
        token: refreshToken,
        tokenType:'refresh'
    })

    console.log(decoded);
    

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

        const accessToken = generateToken({
            payload:{_id:user._id},
            options:{expiresIn:30*60},

        })
        
        return {
            data:{
                accessToken
            }
        }
}





export const getUserProfile = async({id})=>{

    // const profile = await findById({
    //         model:userModel,
    //         id
    // })

    // // console.log(profile);
    
 return{
    data:
    profile
 }

}