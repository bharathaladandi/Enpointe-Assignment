const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        age: { type: Number },
        // role: {
        //     type: String,
        //     enum: ['banker', 'customer'],
        //     default: "customer"
        // },
        balance: {
            type:Number,
            default:0
        },

    },

    {
        timestamps: true,
    });

const Usermodel = mongoose.model("user", userSchema);

module.exports = Usermodel;