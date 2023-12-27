require("dotenv").config();
const express = require("express");
require("./db/conn");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const employeeRoute = require("./router/employee");
const authRouter = require("./router/auth");
const shiftRouter = require("./router/shift");

const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(employeeRoute);
app.use(authRouter);
app.use(shiftRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}...`));
