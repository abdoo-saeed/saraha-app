//for encryption
export const ENC_SECRET_KEY = Buffer.from(process.env.ENC_SECRET_KEY)
export const IV_LENGTH =Number(process.env.IV_LENGTH) 


//for token
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY
export const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY



//for otp 
export const EMAIL = process.env.EMAIL
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
