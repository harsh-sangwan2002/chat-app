import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {

        const isVerified = jwt.verify(token, process.env.JWT_SECRET);

        if (!isVerified) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        next();

    } catch (err) {

        console.log('Error in verifyToken middleware: ', err.message);
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

export default verifyToken;