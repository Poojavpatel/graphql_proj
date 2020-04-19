const Booking = require('../../models/booking');

module.exports = {
  bookings: async (args, req) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated');
    }
    const booking = await Booking.find().populate('event');
    return booking;
  },
  bookEvent: async (args, req) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated');
    }
    const event = await Event.findOne({_id:args.eventId});
    const user = await User.findOne({_id:'5e972de5f0b43022cf1896b9'});
    const booking = new Booking({
      event:event,
      user:user,
    })
    return booking.save();
  },
  cancelBooking: async (args, req) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated');
    }
    const booking = await Booking.find({_id:args.bookingId}).populate('event');
    await Booking.deleteOne({_id:args.bookingId});
    return booking.event || {};
  }
}