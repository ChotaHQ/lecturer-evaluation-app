import { Worker, Job } from "bullmq";
import redisConnection from "../utils/redis";
import EvaluationMetadata from "../models/EvaluationMetadata";
import Lecturer from "../models/Lecturer";

interface deptRatingJobData {
  lecturerID: string;
  department: string;
}

const numOfQuestions = 5; // This will be changed to 20 when the form is updated to have 20 questions

async function calculateDeptRating(
  lecturerID: string,
  department: string,
): Promise<void> {
  const evaluations = await EvaluationMetadata.find({
    lecturerID,
    department,
  }).select("-_id questionRatingsSum");

  if (!evaluations || evaluations.length === 0) {
    console.log(
      `No evaluations found for lecturer ${lecturerID} for dept rating`,
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
      deptRating: parseFloat(average.toFixed(2)),
      numOfRatingsForDeptRating: evaluations.length,
    },
  );

  console.log(
    `Dept rating updated to ${parseFloat(average.toFixed(2))} for lecturer ${lecturerID}`,
  );
}

export function start(): void {
  const worker = new Worker<deptRatingJobData>(
    "calculate-dept-rating",
    async (job: Job<deptRatingJobData>) => {
      const { lecturerID, department } = job.data;
      console.log(
        `Processing dept rating job ${job.id} for lecturer ${lecturerID}`,
      );
      await calculateDeptRating(lecturerID, department);
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
    console.log(`Dept Rating Worker: Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job: Job | undefined, err: Error) => {
    console.error(`Dept Rating Worker: Job ${job?.id} failed:`, err.message);
  });

  console.log("Dept rating worker started");
}
