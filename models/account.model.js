const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const getTime = require("../helpers/getTime");
const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
    role_id: String,
    token: {
        type: String,
        default: () => generate.generateToken(20)
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String,
    status: String,
    createdBy: {
        account_id: String,
        createAt: {
            type: String,
            default: Date.now
        }
    }
}, {
    timestamps: true
});
const Account = mongoose.model('Account', accountSchema, "accounts");

module.exports = Account;