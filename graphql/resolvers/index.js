const usersResolver = require('./users');
const eventsResolver = require('./bookings');
const bookingsResolver = require('./events');

const rootResolver = {
  ...usersResolver,
  ...eventsResolver,
  ...bookingsResolver
}

module.exports = rootResolver;