const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");

const logindetschema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 3 },
    confirm_password: { type: String, minlength: 3 },
    gender: { type: String, required: true  , enum: ['male', 'female', 'other'] },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: "Invalid email",
        },
    },
}, { collection: 'LoginDetail' });

logindetschema.pre("save", async function (next) {
    try {

        if (this.isModified('password')) {
        
            const passwordHash = await bcrypt.hash(this.password, 4);
            this.password = passwordHash;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const loginDet = mongoose.model('LoginDetail', logindetschema);

module.exports = loginDet;
