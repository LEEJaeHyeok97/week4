const Sequelize = require("sequelize");
  // 1
const Posts = require("./posts");


const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

  // 2
db.Posts = Posts; 


  // 3
Posts.init(sequelize);


  // 4
Posts.associate(db);


module.exports = db;


