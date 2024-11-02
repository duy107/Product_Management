const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
    tokenUser: {
        type: String,
        default: generate.generateToken(20)
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String,
    status: {
        type: String,
        default: "active"
    }
}, {
    timestamps: true
});
const Account = mongoose.model('User', userSchema, "users");

module.exports = Account;