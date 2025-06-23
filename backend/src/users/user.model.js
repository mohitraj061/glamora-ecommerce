const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    profileImage: {
        type: String
    },
    bio: {
        type: String,
        maxlength: 200
    },
    profession: {
        type: String
    },
}, { timestamps: true });

// hashing password
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// match password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = new model('User', userSchema);
module.exports = User;