const LOIDatabase = require("../../model/LOI");

const LOIByAgent = async (req,res)=>{
    try {
        const {email} = req.body;
        const con = JSON.stringify({ type: "agent", username: email });

        const [dbRes] = await LOIDatabase.RayQuery(`
        SELECT * FROM loi_data WHERE agent='${con.replace("\n", "")}'
        `);
    
        res.json(dbRes);
    } catch (error) {
        console.log("🚀 ~ file: LoiByAgent.js:5 ~ LOIByAgent ~ error:", error)
        res.status(500).send('error');
    }
}

module.exports = LOIByAgent;