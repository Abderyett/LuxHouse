const redis = require('redis');

const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
});

client.on('connect', () =>
  console.log('Client connected to redis...'.green.inverse)
);
client.on('ready', () =>
  console.log('Client connected to redis and ready...'.brightMagenta.inverse)
);
client.on('end', () =>
  console.log('Client cdisconnect from redis...'.red.inverse)
);
client.on('error', (err) => console.log(err.message.red.inverse));

process.on('SIGINT', () => client.quit());

module.exports = client;
