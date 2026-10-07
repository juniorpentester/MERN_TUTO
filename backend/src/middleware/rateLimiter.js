import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  //first get the rateLimit created in upstash

  try {
    //get the success, identifier
    const { success } = await rateLimit.limit("my-limit-key"); //read on the identifier if auth were used

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too may request, try again later" });
    }
    next();
  } catch (error) {
    console.error("Rate limit error!", error.message);
  }
};

export default rateLimiter;
