const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validate
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone no is required' })
        }

        // Check existing user
        const existingUser = await userModel.findOne({ email });

        // If user exists, return a message
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already registered Please login",
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create and save user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Register",
            error: error.message,
        });
    }
};

//POST LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validate
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invaild email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not register"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "Login successful ",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

// TEST CONTROLLER
const testController = async (req, res) => {
    res.send('Protected Route')
}


module.exports = { registerController, loginController, testController };
