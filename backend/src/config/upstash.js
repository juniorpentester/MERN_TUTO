import { Ratelimit } from "@upstash/ratelimit";
import { Redis, s } from "@upstash/redis";
import dotenv from "dotenv";

/*upstash is a serveless database, we use it here to implement ratelimiting,
to use this Library: "@upstash/ratelimit", it requires "@upstash/redis" SDK*/
//in order for the fromEnv to connect with our .env file we must import it and configure it

dotenv.config();

//we want to create a rateLimiter that only allows 10 request per 20 seconds
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(), //automatically retrieves the UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables required to connect to the Upstash Redis instance.

  limiter: Ratelimit.slidingWindow(10, "20 s"), //method enforces a rolling limit, smoothing out bursts that would occur with fixed windows.
});

export default rateLimit;
