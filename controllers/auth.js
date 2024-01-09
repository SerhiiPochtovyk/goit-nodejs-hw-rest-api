const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: 'Email is already in use' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashPassword });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        newUser.token = token;
        await newUser.save();

        res.status(201).json({
            user: {
                id: newUser._id,
                email: newUser.email,
                subscription: newUser.subscription,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token;
        await user.save();

        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                subscription: user.subscription,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { register, login };
