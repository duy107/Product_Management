const mongoose = require("mongoose");
const getTime = require("../helpers/getTime");
const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String,
    permissions: {
        type: Array,
        default: []
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: String,
            default: Date.now 
        }
    }
}, {
    timestamps: true
});
const Role = mongoose.model('Role', roleSchema, "roles");

module.exports = Role;