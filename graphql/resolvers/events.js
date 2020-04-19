const Event = require('../../models/event');

module.exports = {
  events: (args, req) => {
    return Event.find().populate('createdBy');
  },
  createEvent: (args) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated');
    }
    const event = new Event({
      name: args.eventInput.name,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(),
    });
    return event.save();
  },
}