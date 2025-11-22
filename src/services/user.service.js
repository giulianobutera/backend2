const userDAO = require('../dao/user.dao');
const mailService = require('./mail.service');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

class UserService {
    async createUser(userData) {
        const { email, password } = userData;
        const existingUser = await userDAO.getByEmail(email);
        if (existingUser) throw new Error('El email ya está registrado, ingrese uno diferente.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            ...userData,
            password: hashedPassword
        };

        return await userDAO.create(newUser);
    }

    async getUsers() {
        return await userDAO.getAll();
    }

    async getUserById(id) {
        const user = await userDAO.getById(id);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    }

    async updateUser(id, userData) {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        const updatedUser = await userDAO.update(id, userData);
        if (!updatedUser) throw new Error('Usuario no encontrado');
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await userDAO.delete(id);
        if (!deletedUser) throw new Error('Usuario no encontrado');
        return deletedUser;
    }

    async sendPasswordResetEmail(email) {
        const user = await userDAO.getByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiration = Date.now() + 3600000;

        await userDAO.update(user._id, {
            resetPasswordToken: token,
            resetPasswordExpires: expiration
        });

        const resetUrl = `http://localhost:8080/reset-password/${token}`;
        const message = `
            <h1>Recuperación de contraseña</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para continuar:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>El enlace expirará en 1 hora.</p>
        `;

        await mailService.sendMail(email, 'Recuperación de contraseña', message);
    }

    async resetPassword(token, newPassword) {
        const user = await userDAO.getByResetToken(token);
        if (!user) {
            throw new Error('Token inválido o expirado');
        }

        if (user.resetPasswordExpires < Date.now()) {
            throw new Error('Token expirado');
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new Error('No puedes usar la misma contraseña anterior');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userDAO.update(user._id, {
            password: hashedPassword,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined
        });
    }
}

module.exports = new UserService();
