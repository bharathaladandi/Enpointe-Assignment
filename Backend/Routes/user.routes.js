const { Router } = require("express");
const UserRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usermodel = require("../models/userModel");


UserRouter.get("/", async (req, res) => {

    res.send("Welcome")
})


module.exports = { UserRouter };