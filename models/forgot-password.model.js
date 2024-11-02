const mongoose = require("mongoose");
const forgotSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 0,
    }
}, {
    timestamps: true
});
const Forgot = mongoose.model('Forgot', forgotSchema, "forgots");

module.exports = Forgot;