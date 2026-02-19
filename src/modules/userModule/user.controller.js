import { Router } from "express";


const router = Router();






router.get('/', (req, res, next) => {
    res.json({ msg: "hello from users module" })
})



export default router