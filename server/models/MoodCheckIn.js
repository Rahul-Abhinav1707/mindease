import mongoose from "mongoose";

const moodCheckInSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    mood: {
      type: String,
      enum: ["Great", "Good", "Okay", "Low"],
      required: true
    },
    factors: {
      type: [String],
      default: []
    },
    note: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000
    }
  },
  { timestamps: true, bufferCommands: false }
);

moodCheckInSchema.index({ user: 1, createdAt: -1 });

const MoodCheckIn = mongoose.model("MoodCheckIn", moodCheckInSchema);

export default MoodCheckIn;
