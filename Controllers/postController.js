import { Post } from "../Models/postModels.js";
import { User } from "../Models/userModel.js";
import { createUser } from "./userController.js";


// =============================================
//       =====>  Create New Post  <======
// =============================================

export const createPost = async (req, res, next) => {
    try {
        const { userId, desc } = req.body;
        const post = await Post.create({ userId, desc });
        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            post
        })
    } catch (error) {
        console.log(error);
    }
}

// =============================================
//       =====>  Update Post  <======
// =============================================

export const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { userId, desc } = req.body;
        const post = await Post.findByIdAndUpdate(postId, { $set: { userId, desc } }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Post Updated Successfully",
            post,
        })
    } catch (error) {
        console.log(error);
    }
}

// =============================================
//       =====>  Delete Post  <======
// =============================================

export const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByIdAndDelete(postId);
        res.status(200).json({
            success: true,
            message: "Post Deleted Successfully",
        })
    } catch (error) {
        console.log(error);
    }
}

// =============================================
//       =====>  Get Single Post  <======
// =============================================

export const getSinglePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        res.status(200).json({
            success: true,
            message: "Post Here Ha Ha Ha Ha...",
            post,
        })
    } catch (error) {
        console.log(error);
    }
}

// =============================================
//  ====> Get My Timeline Post <====
// =============================================

export const timelinePost = async (req, res, next) => {
    try {  
        const posts = await Post.find()
        res.status(200).json({
            success: true,
            message: "All Timeline here ..-",
            posts,
        })
    } catch (error) {
        console.log(error);
    }
}

// =============================================
//  ====> Get All Posts <====
// =============================================

export const getAllPost = async (req, res, next) => {
    try {
        const userId = req.params.id; 
        const posts = await Post.find({ userId });
        res.status(200).json({
            success: true,
            message: `All Post's here ..`,
            posts
        })
    } catch (error) {
        console.log(error);
    }
}
// =============================================
//  ====> Get My Timeline Post <====
// =============================================

// export const timelinePost = async (req, res, next) => {
//     try {
//         const userId = req.body.userId;
//         const user = await User.findById(userId);
//         const userPosts = await Post.find({ userId: user._id });
//         const followers = await Promise.all(
//             user.followers.map(friendId => {
//                 return Post.find({ userId: friendId });
//             })
//         )
//         const followings = await Promise.all(
//             user.followings.map(friendId => {
//                 return Post.find({ userId: friendId });
//             })
//         )
//         let timeline = userPosts.concat(...followings).concat(...followers)
//         res.status(200).json({
//             success: true,
//             message: `All Timeline Post's here .. ${timeline.length}`,
//             timeline
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// =============================================
//  ====> Like Post <====
// =============================================

export const likePost = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        let post = await Post.findById(req.params.id)
        if (!post.likes.includes(userId)) {
            post = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: userId } }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            res.status(200).json({
                success: true,
                message: `Post Liked Successfully ..`,
                likes: post.likes.length,
            })
        } else {
            res.status(400).json({
                success: false,
                message: `You Already Liked this post ..`,
                likes: post.likes.length,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// =============================================
//  ====> Disike Post <====
// =============================================

export const dislikePost = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        let post = await Post.findById(req.params.id)
        if (post.likes.includes(userId)) {
            post = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            res.status(200).json({
                success: true,
                message: `Post Disliked Successfully ..`,
                likes: post.likes.length,
            })
        } else {
            res.status(400).json({
                success: false,
                message: `You Already Disliked this post ..`,
                likes: post.likes.length,
            })
        }
    } catch (error) {
        console.log(error);
    }
}