import { Worker, Job } from "bullmq";
import redisConnection from "../utils/redis";
import EvaluationMetadata from "../models/EvaluationMetadata";
import Lecturer from "../models/Lecturer";

interface ovrRatingJobData {
  lecturerID: string;
}

async function calculateOvrRating(lecturerID: string): Promise<void> {
  const numOfQuestions = 5; // This will be changed to 20 when the form is updated to have 20 questions

  const evaluations = await EvaluationMetadata.find({ lecturerID }).select(
    "-_id questionRatingsSum",
  );

  if (!evaluations || evaluations.length === 0) {
    console.log(
      `No evaluations found for lecturer ${lecturerID} for ovr rating`,
    );
    return;
  }

  const totalSum = evaluations.reduce(
    (sum: number, evaluation: { questionRatingsSum: number }) => {
      return sum + evaluation.questionRatingsSum;
    },
    0,
  );

  const average = totalSum / (evaluations.length * numOfQuestions);

  await Lecturer.findOneAndUpdate(
    { lecturerID },
    {
      ovrRating: parseFloat(average.toFixed(2)),
      numOfRatingsForOvrRating: evaluations.length,
    },
  );

  console.log(
    `Ovr rating updated to ${parseFloat(average.toFixed(2))} for lecturer ${lecturerID}`,
  );
}

export function start(): void {
  const worker = new Worker<ovrRatingJobData>(
    "calculate-ovr-rating",
    async (job: Job<ovrRatingJobData>) => {
      const { lecturerID } = job.data;
      console.log(
        `Processing ovr rating job ${job.id} for lecturer ${lecturerID}`,
      );
      await calculateOvrRating(lecturerID);
    },
    {
      connection: redisConnection,
      settings: {
        backoffStrategy: (attemptsMade: number): number => {
          const waitTimes = [3000, 10000, 30000, 60000];
          return waitTimes[attemptsMade - 1] ?? 60000;
        },
      },
    },
  );

  worker.on("completed", (job: Job) => {
    console.log(`Ovr Rating Worker: Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job: Job | undefined, err: Error) => {
    console.error(`Ovr Rating Worker: Job ${job?.id} failed:`, err.message);
  });

  console.log("Ovr rating worker started");
}
