const bcrypt = require('bcrypt');
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

module.exports = {
  events: () => {
    return Event.find().populate('createdBy');
  },
  users: () => {
    return User.find();
  },
  bookings: () => {
    return Booking.find();
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
  },
  bookEvent: async (args) => {
    const event = await Event.findOne({_id:args.eventId});
    const user = await User.findOne({_id:'5e972de5f0b43022cf1896b9'});
    const booking = new Booking({
      event:event,
      user:user,
    })
    return booking.save();
  },
  cancelBooking: async (args) => {
    const booking = await Booking.find({_id:args.bookingId}).populate('event');
    await Booking.deleteOne({_id:args.bookingId});
    return booking.event || {};
  }
}