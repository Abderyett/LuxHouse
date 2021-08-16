const redis = require('redis');

const redisClient = redis.createClient({
  port: 14448,
  host: 'redis-14448.c78.eu-west-1-2.ec2.cloud.redislabs.com',

  password: process.env.REDIS_PASS,
});

redisClient.on('connect', () =>
  console.log('Client connected to redis...'.green.inverse)
);
redisClient.on('ready', () =>
  console.log('Client connected to redis and ready...'.brightMagenta.inverse)
);
redisClient.on('end', () =>
  console.log('Client cdisconnect from redis...'.red.inverse)
);
redisClient.on('error', (err) => console.log(err.message.red.inverse));

// process.on('SIGINT', () => redisClient.quit());

module.exports = redisClient;
