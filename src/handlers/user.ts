import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    res.status(201).json({ message: "user created successfully" });
  } catch (e) {
    e.type === "input";
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Wrong username or password" });
    return;
  }

  const token = createJWT(user);
  // create cookie with token
  res.cookie("Authorization", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 3600 * 24 * 30,
  });

  res.status(200).json({ success: "logged in" });
};
