const Schengen = require('../../model/Schengen');
const Singapore = require("../../model/Singapore");
const Thailand = require('../../model/Thailand');

const GetByPassport = async (req,res)=>{
    try {
        const {country,passport} = req.body;
        if(country === "schengen"){
                const [data] = Schengen.find({
                    passport_number:passport
                });
                return res.status(200).send(data);
        }
        if(country === "singapore"){
                const [data] = Singapore.find({
                    passport_number:passport
                });
                return res.status(200).send(data);
        }
        if(country === "thailand"){
                const [data] = Thailand.find({
                    passport_number:passport
                });
                return res.status(200).send(data);
        }

        return res.status(400).send("not valid request")

    } catch (error) {
        console.log("🚀 ~ file: GetByPassport.js:5 ~ GetByPassport ~ error:", error)
        
    }
}

module.exports = GetByPassport;