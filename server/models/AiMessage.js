import mongoose from "mongoose";

const aiMessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000
    }
  },
  { timestamps: true }
);

aiMessageSchema.index({ user: 1, createdAt: -1 });

const AiMessage = mongoose.model("AiMessage", aiMessageSchema);

export default AiMessage;
