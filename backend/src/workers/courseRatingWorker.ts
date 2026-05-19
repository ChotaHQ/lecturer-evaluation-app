import { Worker, Job } from "bullmq";
import redisConnection from "../utils/redis";
import EvaluationMetadata from "../models/EvaluationMetadata";
import Lecturer from "../models/Lecturer";
import Course from "../models/Course";

interface courseRatingJobData {
  lecturerID: string;
  courseCode: string;
}

async function calculateCourseRating(
  lecturerID: string,
  courseCode: string,
): Promise<void> {
  const numOfQuestions = 5; // This will be changed to 20 when the form is updated to have 20 questions

  const evaluations = await EvaluationMetadata.find({
    lecturerID,
    courseCode,
  }).select("-_id questionRatingsSum");

  const course = await Course.findOne({ courseCode }).select(
    "courseTitle -_id",
  );

  if (!course) {
    console.log(`No course found for course code ${courseCode}`);
    return;
  }

  const { courseTitle } = course;

  if (!evaluations || evaluations.length === 0) {
    console.log(
      `No evaluations found for lecturer ${lecturerID} for course rating`,
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

  const updateExisting = await Lecturer.findOneAndUpdate(
    { "ratedCourses.courseCode": courseCode, lecturerID },
    {
      $set: {
        "ratedCourses.$.avgRating": parseFloat(average.toFixed(2)),
        "ratedCourses.$.numOfRatings": evaluations.length,
      },
    },
    { new: true },
  );

  if (!updateExisting) {
    const courseDetails = {
      courseCode,
      courseTitle,
      avgRating: parseFloat(average.toFixed(2)),
      numOfRatings: evaluations.length,
    };

    await Lecturer.findOneAndUpdate(
      { lecturerID },
      {
        $push: { ratedCourses: courseDetails },
      },
    );
  }

  console.log(
    `Course rating updated to ${parseFloat(average.toFixed(2))} for lecturer ${lecturerID}`,
  );
}

export function start(): void {
  const worker = new Worker<courseRatingJobData>(
    "calculate-course-rating",
    async (job: Job<courseRatingJobData>) => {
      const { lecturerID, courseCode } = job.data;
      console.log(
        `Processing course rating job ${job.id} for lecturer ${lecturerID}`,
      );
      await calculateCourseRating(lecturerID, courseCode);
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
    console.log(`Course Rating Worker: Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job: Job | undefined, err: Error) => {
    console.error(`Course Rating Worker: Job ${job?.id} failed:`, err.message);
  });

  console.log("Course rating worker started");
}
