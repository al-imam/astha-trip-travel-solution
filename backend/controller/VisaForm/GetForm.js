const Singapore = require("../../model/Singapore");
const Thailand = require('../../model/Thailand');
const Schengen = require("../../model/Schengen");

const GetFormData = () => {
    return {
        Singapore: async (req, res) => {
            try {
                const [getServer] = await Singapore.findAll();
                res.send(getServer);
            } catch (error) {
                console.log("🚀 ~ file: GetForm.js:7 ~ Singapore: ~ error:", error)
                res.status(500).send("something is wrong ")

            }
        },
        Thailand: async (req, res) => {
            try {
                const [serverRes] = await Thailand.findAll();
                res.send(serverRes);
            } catch (error) {
                console.log("🚀 ~ file: GetForm.js:19 ~ Thailand: ~ error:", error)
                res.status(500).send("something is wrong ")

            }
        },
        Schengen: async (req, res) => {
            try {
                const [getServer] = await Schengen.findAll();
                res.send(getServer);
            } catch (error) {
                console.log("🚀 ~ file: GetForm.js:32 ~ Schengen: ~ error:", error)
                res.status(500).send("something is wrong ")

            }
        },
    }
}

module.exports = GetFormData;