const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  fname: { type: String, trim: true },
  lname: { type: String, trim: true },
});

userSchema.pre("save", async function (next) {
  try {
    let user = this;

    if (!user.isModified("password")) {
      return next();
    }

    let hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
