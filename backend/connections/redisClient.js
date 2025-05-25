// const redis = require("redis");

// const redisClient = redis.createClient();

// redisClient.on("error", (err) => console.error("Redis error:", err));
// redisClient.connect();

// module.exports = redisClient;
const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (err) => console.error("Redis error:", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();

module.exports = redisClient;
