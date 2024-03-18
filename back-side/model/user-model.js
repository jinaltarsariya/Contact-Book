const mongoose = require("mongoose");
const { error_res, success_res } = require("../library/general");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

const createUser = async (userData) => {
  try {
    let response = await userModel.create(userData);

    return response
      ? success_res("User registration successful!", response)
      : error_res("Internal server error!");
  } catch (error) {
    return error_res(error.message);
  }
};

const getUserByEmailOrMobilenum = async (email, mobileNumber) => {
  try {
    const response = await userModel.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    return response
      ? success_res("This user is already registered!", response)
      : error_res("No user found!");
  } catch (error) {
    return error_res(error.message);
  }
};

const doUpdateUser = async (userId, userData) => {
  try {
    let response = await userModel.findByIdAndUpdate(userId, userData);

    return response
      ? success_res("User updated successfully !", response)
      : error_res("User should not be updated ");
  } catch (error) {
    return error_res(error.message);
  }
};

const doDeleteUser = async (userId) => {
  try {
    let response = await userModel.findByIdAndDelete(userId);

    return response
      ? success_res("User deleted successfully !")
      : error_res("user should not be deleted!");
  } catch (error) {
    return error_res(error.message);
  }
};

const doGetUser = async (userId) => {
  try {
    let response = await userModel.findById(userId);
    return response
      ? success_res("Find user !", response)
      : error_res("you can not display this user data");
  } catch (error) {
    return error_res(error.message);
  }
};

const getAllUser = async () => {
  try {
    let response = await userModel.find();

    return response
      ? success_res("All user data find !", response)
      : error_res("No user data available!");
  } catch (error) {
    return error_res(error.message);
  }
};

module.exports = {
  createUser,
  getUserByEmailOrMobilenum,
  doUpdateUser,
  doDeleteUser,
  doGetUser,
  getAllUser,
};
