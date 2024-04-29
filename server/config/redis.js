// Import ioredis.
// You can also use `import { Redis } from "ioredis"`
// if your project is a TypeScript project,
// Note that `import Redis from "ioredis"` is still supported,
// but will be deprecated in the next major version.
const Redis = require("ioredis");
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_PORT = process.env.REDIS_PORT;

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
// const redis = new Redis();

// jika pakai cloud
const redis = new Redis({
  port: REDIS_PORT, // Redis port
  host: REDIS_HOST, // Redis host
  username: "default", // needs Redis >= 6
  password: REDIS_PASSWORD,
});

module.exports = redis;
