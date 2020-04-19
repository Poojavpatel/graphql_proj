const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
  users: () => {
    return User.find();
  },
  createUser: async (args) => {
    const existingUser = await User.findOne({ email:args.userInput.email });
    if(existingUser){
      throw new Error('User email already exists');
    }
    hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const user = new User({
      name: args.userInput.name,
      mobile: args.userInput.mobile,
      email: args.userInput.email,
      password: hashedPassword,
    });
    return user.save();
  },
  login: async ({email, password}) => {
    const user = await User.findOne({ email:email });
    if(!user){
      throw new Error('User not found');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual){
      throw new Error('Incorrect Password');
    }
    const token = jwt.sign({userId:user.id, email:user.email}, process.env.JWT_SECRET_KEY, { expiresIn: '5h'});
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    }
  }
}