import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";




export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        // Input validation
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Username can only contain letters, numbers, and underscores" });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ message: "Username must be between 3 and 20 characters long" });
        }

        // Check for existing email or username
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Random image path selection
        const PROFILE_PICS = [
            "/avatar1.png",
            "/avatar2.png",
            "/avatar3.png"
        ];
        const imageIndex = Math.floor(Math.random() * PROFILE_PICS.length);
        const image = PROFILE_PICS[imageIndex];

        // Create user
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image,
        });

        // Generate token
        generateToken(newUser._id, res);
        await newUser.save();

        // Send response without password
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...newUser._doc,
                password: "",
            }
        });

    } catch (error) {
        console.log("Error in signup controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function signin(req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Please fill all fields"});
        }
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        generateToken(user._id, res);
        // this will retrun all the fields including password   
        res.status(200).json({
            success:true ,
            user: {
                ...user._doc,
                password: "",
            }
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        return res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        return res.status(500).json({message: "Internal server error"});
        
    }
}

export async function authCheck(req, res) {
    try {
        console.log("req.user:", req.user);
        
        res.status(200).json({success: true, user: req.user});
    } catch (error) {
        console.log("Error in authCheck controller:", error.message);
        return res.status(500).json({message: "Internal server error"});
        
    }
}