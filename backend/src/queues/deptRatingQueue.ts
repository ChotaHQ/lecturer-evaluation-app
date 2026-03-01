import { Queue } from "bullmq";
import redisConnection from "../utils/redis";

const deptRatingQueue = new Queue("calculate-dept-rating", {
  connection: redisConnection,
});

export default deptRatingQueue;
