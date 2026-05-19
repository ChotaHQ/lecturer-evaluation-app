import { Queue } from "bullmq";
import redisConnection from "../utils/redis";

const courseRatingQueue = new Queue("calculate-course-rating", {
  connection: redisConnection,
});

export default courseRatingQueue;
