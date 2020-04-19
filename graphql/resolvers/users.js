const bcrypt = require('bcrypt');
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
  }
}