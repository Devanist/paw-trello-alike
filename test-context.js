var context = require.context('./Tests', true, /-spec\.js$/);
context.keys().forEach(context);