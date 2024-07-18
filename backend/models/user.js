const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
const User=mongoose.model('User',userSchema);
module.exports=User;