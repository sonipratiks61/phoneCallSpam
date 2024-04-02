const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Authorization token required or malformed.' });
    }

    token = token.slice(7, token.length);

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Token is invalid or expired.' });
        }

        req.userId = decoded.id;

        next();
    });
};

module.exports = authMiddleware;
