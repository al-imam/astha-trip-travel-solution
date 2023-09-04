const dotenv = require("dotenv");
dotenv.config();
const DataBase = require("./DBpoll");
const dbname = process.env.DB_NAME;

// check if table exist or not
const chCash = {
  name: null,
  res: false,
};
// function
const chackTable = async (name) => {
  if (chCash === name) {
    return chCash.res;
  }
  try {
    const DB = await DataBase();
    const sql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${name}' AND TABLE_SCHEMA = '${dbname}';`;
    const [res] = await DB.execute(sql);
    chCash.name = name;
    if (res.length) {
      chCash.res = true;
      return true;
    } else {
      chCash.res = false;
      return false;
    }
  } catch (error) {
    console.log("eror in chack db exist function =>", error);
  }
};

// chack is column validate cased

const ColumCash = {};

// main class
class Model {
  constructor(schema, name) {
    this.name = name;
    this.schema = schema;
  }

  async mygrate() {
    try {
      const DB = await DataBase();
      // let forFOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE)
      let FOReign = [];
      const sql = `CREATE TABLE ${dbname}.${this.name} (
                id INT NOT NULL AUTO_INCREMENT ,
                ${this.schema
                  .map((e) => {
                    e.reference
                      ? FOReign.push({ name: e.name, ref: e.reference })
                      : "";
                    return `${e.name} ${e.type} ${
                      e.req ? " NOT NULL" : "NULL"
                    } ${e.defaults ? "DEFAULT '" + e.defaults + "'" : ""} ${
                      e.unique ? "UNIQUE" : ""
                    }`;
                  })
                  .join(",")},
               
                createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
                updateAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
                ${
                  FOReign.length
                    ? `${FOReign.map((e) => {
                        return `,FOREIGN KEY (${e.name}) REFERENCES ${e.ref} ON DELETE CASCADE ON UPDATE CASCADE`;
                      }).join(",")}`
                    : ""
                }
                ) ENGINE = InnoDB;`;

      return DB.execute(sql);
    } catch (error) {
      console.log(`error to mygrate in [${this.name}] =>`, error);
      return error;
    }
  }
  // find all data
  async findAll() {
    try {
      // chack if the table is exist or not
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          const resmy = await this.mygrate();
          resolve();
        });
      }

      const DB = await DataBase();
      let sql = `SELECT * FROM ${this.name}`;
      return DB.execute(sql);
    } catch (error) {
      console.log(`error to get all in [${this.name}] =>`, error);
      return error;
    }
  }

  async findOne(where) {
    try {
      // chack is table exist if not then add the table
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          const resmy = await this.mygrate();
          resolve();
        });
      }

      const q = Object.entries(where)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ");

      const DB = await DataBase();
      const query = `SELECT * FROM ${this.name} WHERE ${q} LIMIT 1`;

      const sql = await DB.execute(query);
      return sql[0];
    } catch (error) {
      console.log("🚀 ~ file: Model.js:101 ~ Model ~ findOne ~ error:", error);
    }
  }

  async find(where) {
    try {
      // chack is table exist if not then add the table
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          const resmy = await this.mygrate();
          resolve();
        });
      }

      const q = Object.entries(where)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ");

      const DB = await DataBase();
      const query = `SELECT * FROM ${this.name} WHERE ${q}`;

      const sql = await DB.execute(query);
      return sql[0];
    } catch (error) {
      console.log("🚀 ~ file: Model.js:101 ~ Model ~ find ~ error:", error);
    }
  }

  // add data
  async Add(data) {
    try {
      // chack is table exist if not then add the table
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          const resmy = await this.mygrate();
          resolve();
        });
      }

      let keys = Object.keys(data);
      let valus = Object.values(data);

      const DB = await DataBase();
      // chack if any colunm are not exist on database
      const schemaCol = this.schema
        .map((e) => {
          return e.name;
        })
        .sort();
      // if cacsh colum esist
      if (!ColumCash[schemaCol.join(",")]) {
        let [cacksql] = await DB.execute(`DESC ${this.name};`);
        // list of colunm that exist on db
        const listOfCol = cacksql
          .map((e) => {
            return e.Field;
          })
          .sort();
        // filter out new added colunm
        const notindb = this.schema.filter((e) => {
          return listOfCol.indexOf(e.name) === -1;
        });
        // chack if no change in schema
        if (notindb.length > 0) {
          // add new colunm that add in schema
          let alter = `ALTER TABLE ${this.name} ${notindb
            .map((w) => {
              return `ADD ${w.name} ${w.type} ${w.req ? " NOT NULL" : "NULL"} ${
                w.defaults ? "DEFAULT '" + w.defaults + "'" : ""
              } ${w.unique ? "UNIQUE" : ""}`;
            })
            .join(" , ")};`;

          let resAlter = await DB.execute(alter);
        }
        // add key on cache
        ColumCash[schemaCol.join(",")] = true;
      }

      let sql = `INSERT INTO ${this.name} (id, 
                ${keys.join(",")},
                createdAt, updateAt) VALUES (NULL, ${"'"}${valus.join(
        "','"
      )}${"'"},
                 current_timestamp(), current_timestamp());`;
      //  console.log(sql);
      const [res] = await DB.execute(sql);
      if (res.errno) {
        let restemp = {
          errno: res.errno,
          sqlState: res.sqlState,
          sqlMessage: res.sqlMessage,
          sql: res.sql,
        };
        return restemp;
      }
      return res;
    } catch (error) {
      if (error.errno) {
        return {
          errno: error.errno,
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
          sql: error.sql,
        };
      }
      console.log(
        "new error in when add data function call in model =>",
        error
      );
      return error;
    }
  }

  async findById(id) {
    // chack is table exist if not then add the table
    if (!(await chackTable(this.name))) {
      await new Promise(async (resolve) => {
        const resmy = await this.mygrate();
        resolve();
      });
    }

    const db = await DataBase();
    const res = await db.execute(`SELECT * FROM ${this.name} WHERE id=${id}`);

    return res[0] ?? null;
  }

  async update(q = { set: {}, where: {} }) {
    try {
      // chack is table exist if not then add the table
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          const resmy = await this.mygrate();
          resolve();
        });
      }

      const where = Object.entries(q.where)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ");

      const set = Object.entries(q.set)
        .map(([key, value]) => `${key}='${value}'`)
        .join(", ");

      const DB = await DataBase();
      const sql = await DB.execute(
        `UPDATE ${this.name} SET ${set} WHERE ${where}`
      );
      return sql;
    } catch (error) {
      console.log("🚀 ~ file: Model.js:101 ~ Model ~ update ~ error:", error);
    }
  }

  async deleteAll(q = {}) {
    try {
      // chack is table exist if not then add the table
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          await this.mygrate();
          resolve();
        });
      }

      const where = Object.entries(q)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ");

      const DB = await DataBase();
      const sql = await DB.execute(`DELETE FROM ${this.name} WHERE ${where}`);
      return sql;
    } catch (error) {
      console.log("🚀 ~ deleteAll ~ error:", error);
    }
  }

  async findByIdAndUpdate(id, querySet = {}) {
    // chack is table exist if not then add the table
    if (!(await chackTable(this.name))) {
      await new Promise(async (resolve) => {
        const resmy = await this.mygrate();
        resolve();
      });
    }

    const set = Object.entries(querySet)
      .map(([key, value]) => `${key}='${value}'`)
      .join(", ");

    const db = await DataBase();
    const res = await db.execute(
      `UPDATE ${this.name} SET ${set} WHERE id=${id}`
    );

    return res;
  }

  async getById(id) {
    // const cash = {
    //   id: null,
    //   res: null,
    // }

    // if(
    //   cash.id === id
    // ){
    //   return res.send(cash.res);
    // }
    try {
      // chack is table exist if not then add the table
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          const resmy = await this.mygrate();
          resolve();
        });
      }

      const DB = await DataBase();
      let sql = `SELECT * FROM ${this.name} WHERE ${this.name}.id = ${id}`;
      return DB.execute(sql);
    } catch (error) {
      console.log(`error to get all in [${this.name}] =>`, error);
      return error;
    }
  }

  // raw sql input
  async RayQuery(sql) {
    try {
      // chack is table exist if not then add the table
      if (!(await chackTable(this.name))) {
        await new Promise(async (resolve) => {
          const resmy = await this.mygrate();
          resolve();
        });
      }

      const DB = await DataBase();
      return DB.execute(sql);
    } catch (error) {
      console.log("🚀 ~ file: Model.js:214 ~ Model ~ RayQuery ~ error:", error);

      return error;
    }
  }
}

module.exports = Model;
