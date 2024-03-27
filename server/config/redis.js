// Import ioredis.
// You can also use `import { Redis } from "ioredis"`
// if your project is a TypeScript project,
// Note that `import Redis from "ioredis"` is still supported,
// but will be deprecated in the next major version.
const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
// const redis = new Redis();

// jika pakai cloud
const redis = new Redis({
    port: 10969, // Redis port
    host: "redis-10969.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "NJ8V788fhDrNhVXYjUD4PaCkxvXzeSb0",
  });

module.exports = redis