import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

let retryTimer;
let isConnecting = false;

export function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

export function getDatabaseState() {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  return states[mongoose.connection.readyState] || "unknown";
}

function scheduleReconnect() {
  if (retryTimer) return;

  retryTimer = setTimeout(() => {
    retryTimer = undefined;
    connectDB();
  }, 10000);
}

export default async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI is not set. API routes that need MongoDB will fail until it is configured.");
    return;
  }

  if (isDatabaseReady() || isConnecting) {
    return;
  }

  try {
    isConnecting = true;
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000
    });
    isConnecting = false;
    console.log("MongoDB connected");
  } catch (error) {
    isConnecting = false;
    console.error("MongoDB connection failed:", error.message);
    console.error("Server will continue running and retry MongoDB connection in 10 seconds.");
    scheduleReconnect();
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
  scheduleReconnect();
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB runtime error:", error.message);
});
