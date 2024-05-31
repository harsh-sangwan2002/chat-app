import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:'15d'
    });

    res.cookie('jwt', token, {

        // Only allow the cookie to be accessed by the web server
        // prevent client-side JavaScript from accessing the cookie
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite:'strict', // prevents CSRF attacks
        secure:process.env.NODE_ENV === 'production' // cookie will only be set on HTTPS
    })
}

export default generateToken;