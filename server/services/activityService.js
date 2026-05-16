import Activity from "../models/Activity.js";

export function createActivity({ user, type, title, description = "", metadata = {} }) {
  return Activity.create({
    user,
    type,
    title,
    description,
    metadata
  });
}
