import { findOne } from "../../DB/db.repo.js"
import { userModel } from "../../DB/models/userModel.js"





export const findByEmail = async ({email , select='' , options={} })=>{

    const doc = await findOne({
        model:userModel,
        filter:{
            email
        },
        select,
        options
    })

    return doc
}