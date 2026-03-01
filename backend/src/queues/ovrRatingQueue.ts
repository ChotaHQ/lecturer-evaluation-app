import { Queue } from "bullmq";
import redisConnection from "../utils/redis";

const ovrRatingQueue = new Queue("calculate-ovr-rating", {
  connection: redisConnection,
});

export default ovrRatingQueue;
