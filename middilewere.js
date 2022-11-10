const jwt = require("jsonwebtoken");

const verifyToken =  (req,res,next)=>{
    if (headerToken) {
        const token = headerToken.replace("Bearer ", "")
        jwt.verify(token, "43209-ni", (err, payload) => {

            if (err) {
                res.status(400).send({
                    success: false,
                    message: "Please Enter valid token"
                })
            } else {
                next();
            }

        })
    } else {
        res.status(400).send({
            success: false,
            message: "Please add token with Header"
        })
    }

}

module.exports=verifyToken