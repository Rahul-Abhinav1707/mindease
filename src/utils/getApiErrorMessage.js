export function getApiErrorMessage(error, fallback) {
  if (!error.response) {
    return "Cannot reach the MindEase API. Make sure the backend server and MongoDB are running.";
  }

  const message = error.response?.data?.message || fallback;

  if (message?.includes("buffering timed out") || message?.includes("users.findOne")) {
    return "Database connection is not ready. Check MongoDB Atlas Network Access and Railway MONGO_URI.";
  }

  return message;
}
