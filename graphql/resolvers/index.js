const Event = require('../../models/event');
const User = require('../../models/user');

module.exports = {
  events: () => {
    return Event.find().populate('createdBy');
  },
  users: () => {
    return User.find();
  },
  createEvent: (args) => {
    const event = new Event({
      name: args.eventInput.name,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(),
    });
    return event.save();
  },
  createUser: (args) => {
    return User.findOne({ email:args.userInput.email })
    .then(user => {
      if(user){
        throw new Error('User email already exists');
      }
      return bcrypt.hash(args.userInput.password, 12)
    }).then(hashedPassword => {
        const user = new User({
          name: args.userInput.name,
          mobile: args.userInput.mobile,
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .catch(err => {
        throw err
      });
  }
}