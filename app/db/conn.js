const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Database Successfully Connected"))
  .catch((e) => console.log(e));
