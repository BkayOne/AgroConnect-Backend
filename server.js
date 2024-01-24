const dotenv = require("dotenv");
const chalk = require("chalk");
const connectDB = require("./config/db");

process.on("uncaughtException", (err) => {
  console.log(chalk.red(`UNCAUGHTEXCEPTION: ${err.stack}`));
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");
const { db } = require("./model/User");

//connect to DB
//
const PORT = process.env.PORT || 5000;



const server = app.listen(PORT, () => {
  console.log('Connecting to db...')
  connectDB();
  console.log('Db is connected...')
  console.log(
    chalk.blue(
      `server running in ${process.env.NODE_ENV} & listening on port ${process.env.PORT}`
    )
  ); 
  // console.log(`server running in development & listening on port 3000`
  // );
});

process.on("unhandledRejection", (err) => {
  console.log(chalk.red(`UNHANDLEDREJECTION: ${err.message}`));
  server.close(() => {
    process.exit(1);
  });
});
