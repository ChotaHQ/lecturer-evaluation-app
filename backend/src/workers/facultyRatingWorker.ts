import { Worker, Job } from "bullmq";
import redisConnection from "../utils/redis";
import EvaluationMetadata from "../models/EvaluationMetadata";
import Lecturer from "../models/Lecturer";

interface facultyRatingJobData {
  lecturerID: string;
  faculty: string;
}

const numOfQuestions = 5; // This will be changed to 20 when the form is updated to have 20 questions

async function calculateFacultyRating(
  lecturerID: string,
  faculty: string,
): Promise<void> {
  const evaluations = await EvaluationMetadata.find({
    lecturerID,
    faculty,
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
      facultyRating: parseFloat(average.toFixed(2)),
      numOfRatingsForFacultyRating: evaluations.length,
    },
  );

  console.log(
    `Faculty rating updated to ${parseFloat(average.toFixed(2))} for lecturer ${lecturerID}`,
  );
}

export function start(): void {
  const worker = new Worker<facultyRatingJobData>(
    "calculate-faculty-rating",
    async (job: Job<facultyRatingJobData>) => {
      const { lecturerID, faculty } = job.data;
      console.log(
        `Processing faculty rating job ${job.id} for lecturer ${lecturerID}`,
      );
      await calculateFacultyRating(lecturerID, faculty);
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
    console.log(`Faculty Rating Worker: Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job: Job | undefined, err: Error) => {
    console.error(`Faculty Rating Worker: Job ${job?.id} failed:`, err.message);
  });

  console.log("Faculty rating worker started");
}
