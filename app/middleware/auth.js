const jwt = require("jsonwebtoken");
const Employee = require("../model/employee");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
    const employee = await Employee.findOne({
      $and: [{ _id: verifyUser._id }, { "tokens.token": token }],
    });
    if (!employee) {
      res.status(401).send("Invalid User");
    } else {
      req.token = token;
      req.employee = employee;
      next();
    }
  } catch (e) {
    res.status(401).send("Invalid User");
  }
};
module.exports = auth;
