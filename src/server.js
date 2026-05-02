import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());
app.use(express.json());

app.get('/notes', (req, res) => {
  req.log.info(`GET /notes`);
  res.json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  req.log.info(`GET /notes/${req.params.noteId}`);
  res.json({ message: 'Retrieved note with ID: id_param' });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res, next) => {
  req.log.error('404');
  res.status(404).send('Route not found');
});

app.use((err, req, res, next) => {
  req.log.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
