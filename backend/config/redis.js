import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

const client = redisUrl
  ? createClient({
      url: redisUrl,
    })
  : null;

let isRedisReady = false;

if (client) {
  client.on("error", (error) => {
    console.error("Redis error:", error.message);
  });

  client.on("ready", () => {
    isRedisReady = true;
    console.log("Redis connected");
  });

  client.on("end", () => {
    isRedisReady = false;
    console.warn("Redis connection closed");
  });

  client.connect().catch((error) => {
    isRedisReady = false;
    console.warn("Redis unavailable, continuing without cache:", error.message);
  });
} else {
  console.warn("REDIS_URL is not configured. Continuing without cache.");
}

const runIfReady = async (operation, fallbackValue = null) => {
  if (!client || !isRedisReady) {
    return fallbackValue;
  }

  try {
    return await operation();
  } catch (error) {
    console.warn("Redis operation failed:", error.message);
    return fallbackValue;
  }
};

const redis = {
  get: async (key) => runIfReady(() => client.get(key), null),
  set: async (key, value, options) => runIfReady(() => client.set(key, value, options), null),
  del: async (key) => runIfReady(() => client.del(key), 0),
  isReady: () => isRedisReady,
};

export default redis;
