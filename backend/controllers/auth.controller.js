import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const signup = async (req, res) => {

    try {

        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password do not match"
            })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar.iran.liara.run/public/boy
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const grilProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender == 'male' ? boyProfilePic : grilProfilePic,
        });

        if (newUser) {

            // generate token using jwt
            generateToken(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }

        else {

            res.status(400).json({
                message: "Invalid user data"
            })
        }

    } catch (err) {

        console.log('Error in signup controller: ', err.message);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}

export const login = async (req, res) => {

    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (err) {

        console.log('Error in login controller: ', err.message);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}

export const logout = (req, res) => {

    res.send('logout');
}