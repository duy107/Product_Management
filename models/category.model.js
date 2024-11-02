const mongoose = require("mongoose");
// const getTime = require("../helpers/getTime");
const slug = require('mongoose-slug-updater');
const getTime = require("../helpers/getTime");
mongoose.plugin(slug);
const categorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    image: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },

    deletedAt: String,
    status: String,
    position: Number,
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}, {
    timestamps: true
});
const Category = mongoose.model('Category', categorySchema, "categories");

module.exports = Category;