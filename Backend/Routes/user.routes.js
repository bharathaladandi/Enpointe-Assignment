const { Router } = require("express");
const UserRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usermodel = require("../models/userModel");

//Get User
UserRouter.get("/", async(req,res)=> {
    const users = await Usermodel.find();
    return res.send(users);
})


// POST SIGNUP LOGIC
UserRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const userPresent = await Usermodel.findOne({ email })
    if (userPresent) {
        res.send("Try loggin in, already exist")
    }
    else {
        try {
            bcrypt.hash(password, 4, async function (err, hash) {
                const user = new Usermodel({ email, password: hash, firstName, lastName })
                await user.save()
                res.send("Sign up successfull")
            });

        }
        catch (err) {
            console.log(err)
            res.send("Something went wrong, pls try again later")
        }

    }


});


// POST LOGIN LOGIC
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const user = await Usermodel.find({ email });
            if (user.length > 0) {

                const hashed_password = user[0].password;

                bcrypt.compare(password, hashed_password, function (err, result) {

                    if (result) {
                        const token = jwt.sign({ "userid": user[0]._id }, 'hush')
                        res.status(200).send({ msg: "Login Success", "token": token })
                        console.log({ "msg": "Login Success", "token": token });

                    } else {
                        res.status(400).send({ "msg": "Wrong Password" })
                        console.log({ "msg": "Wrong Password" });
                    }
                })




            } else {
                res.status(404).send({ "msg": "No Account Found" })
            }

        } catch (err) {
            res.status(400).send({ "msg": err.message })
        }
    } else {
        res.status(400).send({ "msg": "Email & password required" })
    }
})



module.exports = { UserRouter };