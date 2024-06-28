import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: ' pong' });
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    return res.status(401).json({ message: 'unauthorized' });
  }
  if (err.type === 'input') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  res.status(500).json({ message: "Oops that's on us" });
});

export default app;
