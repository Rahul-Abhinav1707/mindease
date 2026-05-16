import api from "./api";

export const wellnessService = {
  async listJournals() {
    const { data } = await api.get("/journals");
    return data;
  },
  async createJournal(payload) {
    const { data } = await api.post("/journals", payload);
    return data;
  },
  async listMoods() {
    const { data } = await api.get("/moods");
    return data;
  },
  async createMood(payload) {
    const { data } = await api.post("/moods", payload);
    return data;
  },
  async listActivities() {
    const { data } = await api.get("/activities");
    return data;
  },
  async getSettings() {
    const { data } = await api.get("/settings");
    return data;
  },
  async updateSettings(payload) {
    const { data } = await api.put("/settings", payload);
    return data;
  }
};
