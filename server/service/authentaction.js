const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const asyncHandler= require("express-async-handler")

const authenticate = asyncHandler( async (req,res,next)=>{
    let token = req?.cookies["access-token"]
    if(!token){
        return res.status(401).send({
            message: "Token is required !!"
        })
    }
    token = token?.split(" ")[1]

    let secretKey = "Seceret_key"
    let decode = jwt.verify(token,secretKey)
    if(!decode){
        return res.status(401).send({
            message: "Token is required !!"
        })
    }

    let user = await User.findById(decode.id)
    req.user = user

    next()
})

module.exports = {
    authorizeUser: authenticate,
}
