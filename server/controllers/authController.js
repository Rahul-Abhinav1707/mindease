import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { getDatabaseState, isDatabaseReady } from "../config/db.js";

const createSession = (user) => ({
  token: generateToken(user._id),
  user: user.toSafeObject()
});

export async function register(req, res, next) {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({ message: "Database is not connected yet. Please retry in a moment.", database: getDatabaseState() });
    }

    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ fullName, email, password });
    res.status(201).json(createSession(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({ message: "Database is not connected yet. Please retry in a moment.", database: getDatabaseState() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json(createSession(user));
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json({ user: req.user.toSafeObject() });
}
