import api from "./api";

export const aiService = {
  async getHistory() {
    const { data } = await api.get("/ai/history");
    return data;
  },
  async sendGuideMessage(payload) {
    const { data } = await api.post("/ai/guide", payload);
    return data;
  }
};
