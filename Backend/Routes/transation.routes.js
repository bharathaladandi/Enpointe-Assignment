const { Router } = require("express");
const TransRouter = Router();
const {Transaction} = require("../models/transactionModel")
const {Usermodel} = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




/// Deposit route
TransRouter.post('/deposit', async (req, res) => {
    try {
      const { _id, amount } = req.body;
  console.log(_id, amount);
      // Create a new deposit transaction
      const depositTransaction = new Transaction({
        user: _id,
        amount: amount ,
        type: 'deposit',
      });

  
      // Update the user's account balance
    //   await Usermodel.findByIdAndUpdate(userId, { $inc: { balance: amount } });

      await depositTransaction.save();
  
      res.status(201).send({ message: 'Deposit successful' });
    } catch (error) {
      res.status(500).send({ error: 'An error occurred during deposit' });
    }
});


// Withdrawal route
TransRouter.post('/withdraw', async (req, res) => {
    try {
      const { _id, amount } = req.body;
  
    
      const user = await Usermodel.findById(_id);
  
      // Check if the user has sufficient balance for withdrawal
      if (user.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      // Create a new withdrawal transaction
      const withdrawalTransaction = new Transaction({
        user: _id,
        amount,
        type: 'withdrawal',
      });
  
      // Update the user's account balance by deducting the withdrawn amount
      await Usermodel.findByIdAndUpdate(_id, { $inc: { balance: -amount } });
  
      await withdrawalTransaction.save();

      res.status(201).json({ message: 'Withdrawal successful' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during withdrawal' });
    }
});



// //Get User
// TransRouter.get("/", async(req,res)=> {
//     const users = await Usermodel.find();
//     return res.send(users);
// })


// // POST SIGNUP LOGIC
// TransRouter.post("/signup", async (req, res) => {
//     const { email, password, firstName, lastName } = req.body;
//     const userPresent = await Usermodel.findOne({ email })
//     if (userPresent) {
//         res.send("Try loggin in, already exist")
//     }
//     else {
//         try {
//             bcrypt.hash(password, 4, async function (err, hash) {
//                 const user = new Usermodel({ email, password: hash, firstName, lastName })
//                 await user.save()
//                 res.send("Sign up successfull")
//             });

//         }
//         catch (err) {
//             console.log(err)
//             res.send("Something went wrong, pls try again later")
//         }

//     }


// });


// // POST LOGIN LOGIC
// TransRouter.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     if (email && password) {
//         try {
//             const user = await Usermodel.find({ email });
//             if (user.length > 0) {

//                 const hashed_password = user[0].password;

//                 bcrypt.compare(password, hashed_password, function (err, result) {

//                     if (result) {
//                         const token = jwt.sign({ "userid": user[0]._id }, 'hush')
//                         res.status(200).send({ msg: "Login Success", "token": token })
//                         console.log({ "msg": "Login Success", "token": token });

//                     } else {
//                         res.status(400).send({ "msg": "Wrong Password" })
//                         console.log({ "msg": "Wrong Password" });
//                     }
//                 })




//             } else {
//                 res.status(404).send({ "msg": "No Account Found" })
//             }

//         } catch (err) {
//             res.status(400).send({ "msg": err.message })
//         }
//     } else {
//         res.status(400).send({ "msg": "Email & password required" })
//     }
// })




module.exports = { TransRouter };