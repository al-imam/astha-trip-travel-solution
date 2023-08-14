const LOI = require('../../model/LOI');


const GetAll = async (req,res,next)=>{
    try {
        if(!req.User.Admin){
            throw {
                message: "Unauthorized",
                instanceof:"not auth"
            }
        }
            const [resdb] = await LOI.findAll();
            res.json(resdb);

    } catch (error) {
        console.log("🚀 ~ file: getall.js:5 ~ GetAll ~ error:", error)
        next(error)
    }
}

module.exports = GetAll;