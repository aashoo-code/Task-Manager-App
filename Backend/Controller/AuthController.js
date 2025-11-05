const bcrypt = require("bcrypt");
const UserModel = require("../Models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try { 
        const { email, password, username } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return  res.status(409).json({ message: "User already exists, you can login instead", success: false});
        }
        const userModel = new UserModel({ email, password, username });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: "User registered successfully", success: true});
    }
    catch (err) {
        res.status(500).json({message: 'Internal Server Error', success: false });
        console.error("Error during signup:", err); 
        // You can add more error handling logic here if needed
        
    }
};

const login = async (req, res) => {
    try {
        console.log("Body received:", req.body);
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }
        const jwtToken = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: "Login successful", success: true, jwtToken, email, username: user.username });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error', success: false });
        console.error("Error during login:", err);
    }
};

module.exports = {
    signup,
    login
};
