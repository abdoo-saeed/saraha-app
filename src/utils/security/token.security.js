
import  jwt  from 'jsonwebtoken';
import { REFRESH_SECRET_KEY, TOKEN_SECRET_KEY } from '../../../config/config.service.js';

export const  generateToken = ({payload , options = {} , tokenType='access'})=>{

    let secretKey
    switch (tokenType) {

        case 'access':
            secretKey= TOKEN_SECRET_KEY
            break;

        case 'refresh' :
            secretKey= REFRESH_SECRET_KEY   
            break;
    
        default:
            break;
    }


    return jwt.sign(payload,secretKey,options)

}



export const  verifyToken = ({token , tokenType='access'})=>{

    let secretKey
    switch (tokenType) {

        case 'access':
            secretKey= TOKEN_SECRET_KEY
            break;

        case 'refresh' :
            secretKey= REFRESH_SECRET_KEY   
            break;
    
        default:
            break;
    }


    return jwt.verify(token,secretKey)

}