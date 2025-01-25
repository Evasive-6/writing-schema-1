import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const userSchema = new mongoose.Schema({
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
    roles: {
        type: [String],
        default: ['user']
    },
    profile: {
        type: profileSchema,
        required: true
    },
    lastLogin: {
        type: Date
    }
});

const User = mongoose.model('User', userSchema);

export default User;
