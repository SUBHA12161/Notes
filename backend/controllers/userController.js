const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body.formData;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new userModel({ username, email, password });
        await user.save();

        res.status(201).json({ status: "Success", message: "User Created.", data: user });
    } catch (error) {
        console.log("signup err = ", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body.formData;

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ status: "Success", token });
    } catch (error) {
        console.log("login err = ", error);
        res.status(500).json({ message: 'Server error' });
    }
};