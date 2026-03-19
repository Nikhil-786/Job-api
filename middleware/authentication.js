const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payLoad.userId, name: payLoad.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Invalid token');
    }
}

module.exports = authMiddleware;