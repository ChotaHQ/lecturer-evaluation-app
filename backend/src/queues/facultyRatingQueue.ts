import { Queue } from "bullmq";
import redisConnection from "../utils/redis";

const facultyRatingQueue = new Queue("calculate-faculty-rating", {
  connection: redisConnection,
});

export default facultyRatingQueue;
