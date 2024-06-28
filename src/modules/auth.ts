import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const ROUNDS = process.env.SALT_ROUNDS || 5;

export const hashPassword = (password) => {
  return bcrypt.hash(password, ROUNDS);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
  );
  return token;
};

export const protect = (req, res, next) => {
  // get cookie from header
  const [_, token] = req.headers.cookie.split('=');
  if (!token) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: 'not valid token' });
    return;
  }
};
