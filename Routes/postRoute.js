import express from "express";
import {createPost, deletePost, dislikePost, getAllPost, getSinglePost, likePost, timelinePost, updatePost } from "../Controllers/postController.js";
import { isAuth } from "../middleware/auth.js";

export const postRoute = express.Router();

postRoute.post('/new', isAuth, createPost);
postRoute.put('/update/:id', isAuth, updatePost);
postRoute.delete('/delete/:id', isAuth, deletePost);
postRoute.get('/post/:id', getSinglePost);
postRoute.get('/myposts/:id', getAllPost);
postRoute.get('/timeline', timelinePost);
postRoute.put('/like/:id', isAuth, likePost);
postRoute.put('/dislike/:id', isAuth, dislikePost);