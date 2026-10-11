import TryCatch from "../utils/Trycatch.js";
import { User } from "../models/userModel.js";
import getDataUrl from "../utils/urlGenrator.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json(user);
});

export const userProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user)
    return res.status(404).json({
      message: "No User with is id",
    });

  res.json(user);
});

export const followandUnfollowUser = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  const loggedInUserId = req.user._id;

  if (!user)
    return res.status(404).json({
      message: "No User with is id",
    });

  if (user._id.equals(loggedInUserId))
    return res.status(400).json({
      message: "You can't follow yourself",
    });

  // $pull / $addToSet atomic hain: double-click ya parallel requests se duplicate/lost entries nahi banengi
  if (user.followers.some((id) => id.equals(loggedInUserId))) {
    await Promise.all([
      User.updateOne({ _id: loggedInUserId }, { $pull: { followings: user._id } }),
      User.updateOne({ _id: user._id }, { $pull: { followers: loggedInUserId } }),
    ]);

    res.json({
      message: "User Unfollowed",
    });
  } else {
    await Promise.all([
      User.updateOne({ _id: loggedInUserId }, { $addToSet: { followings: user._id } }),
      User.updateOne({ _id: user._id }, { $addToSet: { followers: loggedInUserId } }),
    ]);

    res.json({
      message: "User Followed",
    });
  }
});

export const userFollowerandFollowingData = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("followers", "-password")
    .populate("followings", "-password");

  const followers = user.followers;
  const followings = user.followings;

  res.json({
    followers,
    followings,
  });
});

export const updateProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name } = req.body;

  if (name) {
    user.name = name;
  }

  const file = req.file;
  if (file) {
    const fileUrl = getDataUrl(file);

    await cloudinary.v2.uploader.destroy(user.profilePic.id);

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    user.profilePic.id = myCloud.public_id;
    user.profilePic.url = myCloud.secure_url;
  }

  await user.save();

  res.json({
    message: "Profile updated",
  });
});

export const updatePassword = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, newPassword } = req.body;

  const comparePassword = await bcrypt.compare(oldPassword, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Wrong old password",
    });

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  res.json({
    message: "Password Updated",
  });
});
