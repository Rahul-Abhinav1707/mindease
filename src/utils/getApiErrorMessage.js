export function getApiErrorMessage(error, fallback) {
  if (!error.response) {
    return "Cannot reach the MindEase API. Make sure the backend server and MongoDB are running.";
  }

  return error.response?.data?.message || fallback;
}
