const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: 'El usuario no está autorizado' });
        if (req.user.role !== role) return res.status(403).send({ error: 'El usuario no tiene permisos' });
        next();
    };
};

module.exports = authorization;
