const userService = require('../services/user.service');

class UserController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({ message: 'Usuario creado exitosamente', user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.uid);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await userService.updateUser(req.params.uid, req.body);
            res.json({ message: 'Usuario actualizado', user: updatedUser });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await userService.deleteUser(req.params.uid);
            res.json({ message: 'Usuario eliminado', user: deletedUser });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await userService.sendPasswordResetEmail(email);
            res.json({ message: 'Correo de recuperación enviado' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            await userService.resetPassword(token, password);
            res.json({ message: 'Contraseña restablecida exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
