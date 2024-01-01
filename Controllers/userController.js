import bcrypt from "bcrypt";
import { User } from "../Models/userModel.js";
import { sendCookie } from "../utils/features.js";


//=================================================================
// ==>  Create a new user <==
//=================================================================

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, country, city, description, gender, relationship } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "Email Already Exists 🔺"
            });
        }
        const hashPass = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashPass, country, city, description, gender, relationship })
        res.status(200).json({
            success: true,
            message: "User Created Successfully 👌",
            user,
        })
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Update User <==
//=================================================================

export const updateUser = async (req, res, next) => {
    try {
        const { name, email, country, city, description, gender, relationship } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { $set: { name, email, country, city, description, gender, relationship } }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(201).json({
            success: true,
            message: "User Updated Successfully ✒️",
            user,
        })
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Get My Profile  <==
//=================================================================

export const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Pahle Login Kr Saale",
            })
        }
        res.status(200).json({
            success: true,
            message: "Le Samalo aa ri Profile 😂😂",
            user,
        })
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Get Single User <==
//=================================================================

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id; 
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Id Invalid"
            })
        }
        res.status(200).json({
            success: true,
            message: "Le Samalo aa ri Profile 😂😂",
            user,
        })
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Delete My Profile <==
//=================================================================

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            message: "Profile Deleted Permanently 😏",
        })
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Login User <==
//=================================================================

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Saale Fake ID Deta Hai 🔺"
            })
        }
        const isPass = await bcrypt.compare(password, user.password)
        if (!isPass) {
            return res.status(401).json({
                success: false,
                message: "Saale Fake ID Deta Hai 🔺"
            })
        }
        sendCookie(user,res,200,'Logged in Successfully 😉')
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Logout User <==
//=================================================================

export const logoutUser = async (req, res, next) => {
    try { 
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Saale Krna Kya chahta Hai "
            })
        }
        res.status(200).cookie('token','',{
            httpOnly:false,
            maxAge:new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Logout Successfully 🤟"
        })
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Follow User <==
//=================================================================

export const followUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        let user = await User.findById(req.params.id)
        if (!user.followers.includes(userId)) {
            await User.findByIdAndUpdate(userId, { $push: { followings: user._id } });
            await User.findByIdAndUpdate(user._id, { $push: { followers: userId } });
            res.status(200).json({
                success: true,
                message: `You Followed ${user.name} 👍`,
            })
        } else {
            res.status(401).json({
                success: false,
                message: `Already Followed ${user.name}`,
            })
        }
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  UnFollow User <==
//=================================================================

export const unfollowUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        let user = await User.findById(req.params.id)
        if (user.followers.includes(userId)) {
            await User.findByIdAndUpdate(userId, { $pull: { followings: user._id } });
            await User.findByIdAndUpdate(user._id, { $pull: { followers: userId } });
            res.status(200).json({
                success: true,
                message: `You  Unfollowed ${user.name} 👎`,
            })
        } else {
            res.status(401).json({
                success: false,
                message: `Already UnFollowed ${user.name}`,
            })
        }
    } catch (error) {
        console.log(error);
    }
};

//=================================================================
// ==>  Get Friends / Followers <==
//=================================================================

export const getMyFriends = async (req, res, next) => {
    try {
        // const { userId } = req.body;
        const userId = req.params.id;
        let user = await User.findById(userId)
        if (user) {
            if (user.followings.length < 1 && user.followers.length < 1) {
                res.status(400).json({
                    success: false,
                    message: "You have't Following or Followers"
                })
            }
            else {
                const friendsList = [];
                // Fetch Users Followings
                const followers = await Promise.all(user.followers.map((friend) => {
                    return User.findById(friend)
                }));
                followers.map(friends => {
                    const { _id, name, profilePicture } = friends;
                    friendsList.push({ _id, name, profilePicture })
                })
                // Fetch Users Followers
                const followings = await Promise.all(user.followings.map((friend) => {
                    return User.findById(friend)
                }));
                followings.map(friends => {
                    const { _id, name, profilePicture } = friends;
                    friendsList.push({ _id, name, profilePicture })
                })
                // filter Duplicate Followers
                res.status(200).json({
                    success: true,
                    message: `${user.name}'s Friends Here's 🤍`,
                    followings: followings.length,
                    followers: followers.length,
                    friends: friendsList,

                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: `User ID not found`,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//=================================================================
// ==>  Get All Users <==
//=================================================================

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: `Total users : ${users.length}`,
            users,
        })
    } catch (error) {
        console.log(error);
    }
}