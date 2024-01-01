import express from "express";
import { createUser, deleteUser, followUser, getAllUsers, getMyFriends, getMyProfile, getUser, loginUser, logoutUser, unfollowUser, updateUser } from "../Controllers/userController.js";
import { isAuth } from "../middleware/auth.js";
export const userRoute = express.Router();

userRoute.post('/new',createUser);
userRoute.put('/update/:id',isAuth,updateUser);
userRoute.get('/profile/:id',isAuth, getUser);
userRoute.get('/myprofile',isAuth, getMyProfile);
userRoute.post('/login',loginUser);
userRoute.get('/logout',isAuth,logoutUser);
userRoute.put('/follow/:id',isAuth, followUser);
userRoute.put('/unfollow/:id',isAuth, unfollowUser);
userRoute.delete('/delete',isAuth, deleteUser);
userRoute.get('/allusers',getAllUsers);
userRoute.get('/myfriends/:id',getMyFriends); 