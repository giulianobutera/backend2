const User = require('../models/user');

class UserDAO {
    async getAll() {
        return await User.find().populate('cart');
    }

    async getById(id) {
        return await User.findById(id).populate('cart');
    }

    async getByEmail(email) {
        return await User.findOne({ email });
    }

    async getByResetToken(token) {
        return await User.findOne({ resetPasswordToken: token });
    }

    async create(userData) {
        return await User.create(userData);
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserDAO();
