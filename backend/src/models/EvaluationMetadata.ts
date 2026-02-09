import mongoose from "mongoose";

const evaluationMetadataSchema = new mongoose.Schema(
  {
    matricNum: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    lecturerName: {
      type: String,
      required: true,
    },
    lecturerId: {
      type: String,
      required: true,
    },
    questionRatings: {
      type: Map,
      of: Number,
      required: true,
      validate: {
        validator: function (ratings: Map<string, number>) {
          return ratings.size > 0;
        },
        message: "At least one question must be rated",
      },
    },
    questionRatingsSum: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("EvaluationMetadata", evaluationMetadataSchema);
