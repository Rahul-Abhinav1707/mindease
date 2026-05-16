import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 8000
    },
    prompt: {
      type: String,
      default: "",
      trim: true
    },
    mood: {
      type: String,
      default: "",
      trim: true
    }
  },
  { timestamps: true, bufferCommands: false }
);

journalEntrySchema.index({ user: 1, createdAt: -1 });

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

export default JournalEntry;
