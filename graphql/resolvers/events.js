const Event = require('../../models/event');

module.exports = {
  events: () => {
    return Event.find().populate('createdBy');
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
}