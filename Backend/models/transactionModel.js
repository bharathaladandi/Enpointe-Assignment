const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    amount: {
        type: Number,
        require: true,
    },

    type: {
        type: String,
        enum: ['deposit', 'withdraw'],
        required: true,
    },

    timestamp: {
        type: Date,
        default: Date.now,
    },
})


const Transaction = mongoose.model("transaction", transactionSchema);    

module.exports = Transaction;