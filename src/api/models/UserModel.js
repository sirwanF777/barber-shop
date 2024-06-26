const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true });


// userSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

userSchema.pre('save', async function (next) {
    const user = this;

    // بررسی تکراری بودن نام کاربری
    const existingUser = await mongoose.models.User.findOne({ userName: user.userName });
    if (existingUser) {
        const error = new Error('Username already exists');
        error.status = 400; // کد وضعیت HTTP برای خطای درخواست بد
        return next(error);
    }

    // هش کردن رمز عبور
    const salt = await bcrypt.genSalt(10); // 10 دوره salt
    user.password = await bcrypt.hash(user.password, salt);

    next();
});

// userSchema.statics.login = async function (userName, password) {
//     const user = await this.findOne({ userName });
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if (auth) {
//             return user;
//         }
//         throw Error ("incorrect password");
//     }
//     throw Error ("incorrect user name");
// };

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;