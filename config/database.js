const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://duytrinhcong107:SD3vKD6hP0QX4M9h@cluster0.cq7eh.mongodb.net/ProductManagement");
        console.log("Connect success");
    } catch (error) {
        console.log("Connect ERROR");
    }
}