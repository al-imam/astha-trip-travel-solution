const path = require("path");
const fs = require("fs");
const LOI = require("../../model/LOI");
const uuid4 = require("uuid").v4;
const Agent = require("../../model/Agent");

const LOIEntry = async (req, res, next) => {
  try {
    if (!req.body.datas) {
      throw {
        message: "not auth token!",
        instanceof: "loiadd",
      };
    }

    let reqfrom = null;

    if (req.User.Agent) {
      reqfrom = {
        type: "Agent",
        data: req.User.Agent,
      };
    }

    if (req.User.Admin) {
      reqfrom = {
        type: "Admin",
        data: req.User.Admin,
      };
    }

    if (!reqfrom) {
      throw {
        message: "not auth token!",
        instanceof: "loiadduth",
      };
    }

    let agentforbalance;
    if (reqfrom.type === "Agent") {
      // chack agent balence
      const [Agentindb] = await Agent.findById(reqfrom.data.id);
      agentforbalance = Agentindb;
      if (+Agentindb.balence < req.body.datas.length * +Agentindb.rate) {
        return res.status(400).send("no balance");
      }
    }

    const fileList = req.body.datas
      .map((e) => {
        return [e.passportPhoto, e.visaPhoto, e.hotelbooking, e.ticket];
      })
      .flat(Infinity)
      .filter((e) => e !== null)
      .filter((item, index, arr) => arr.indexOf(item) === index);

    let err = fileList
      .map((element) => {
        const oldPath = path.join(__dirname, "../../upload/temp", element);
        const newPath = path.join(
          __dirname,
          "../../upload/loireqfile",
          element
        );
        try {
          let res = fs.renameSync(oldPath, newPath);
          return false;
        } catch (error) {
          return {
            // err:error,
            path: element,
          };
        }
      })
      .filter((e) => e);

    if (err.length) {
      throw {
        message: "file not exist",
        instanceof: "loiadd",
      };
    }

    //   veryfy
    // TODO: veryfy the data

    const whoe = {
      type: "admin",
      username: reqfrom.data.username,
    };

    if (reqfrom.type === "Agent") {
      whoe.type = "agent";
      whoe.username = reqfrom.data.email;
    }

    const BODY = req.body;
    const refarense = uuid4();
    // console.log("datas", BODY.datas);
    // console.log("iten", BODY.iternary);

    const errindb = BODY.datas.map((e) => {
      let saveData = async (e) => {
        try {
          const resdb = await LOI.Add({
            guest_name: e.guestName,
            pasport_number: e.passportNumber,
            travel_date: e.travelDate,
            hotel_name: e.hotelName,
            reference: refarense,
            price: reqfrom.type === "Admin" ? "admin" : null,
            pasport_copy: e.passportPhoto,
            visa_copy: e.visaPhoto,
            hotel_copy: e.hotelbooking,
            country: e.country,
            tiket_copy: e.ticket,
            iternary: BODY.iternary,
            purpose: BODY["tour-purpose"],
            status: "pending",
            agent: JSON.stringify(whoe),
          });
          if (resdb.err) {
            throw {
              message: resdb.err.sqlMessage,
              instanceof: "loiadd",
            };
          }
        } catch (err) {
          console.log("🚀 ~ file: LOIentry.js:90 ~ saveData ~ err:", err);
          next(err);
        }
      };
      saveData(e);
    });

    if (reqfrom.type === "Agent") {
      // chack agent balence

      const bala =
        +agentforbalance.balance -
        +req.body.datas.length * +agentforbalance.rate;
      const [Agentindb] = await Agent.findByIdAndUpdate(reqfrom.data.id, {
        balance: bala,
      });
    }

    res.send("ok");
  } catch (error) {
    console.log("🚀 ~ file: LOIentry.js:5 ~ LOIEntry ~ error:", error);
    next(error);
  }
};

module.exports = LOIEntry;
