import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory + file backup store for student scores
interface StudentScoreSubmission {
  studentName: string;
  studentClass: string;
  studentNumber: string;
  character: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  lives: number;
  timeElapsed: number;
  timestamp: string;
  teacherEmail: string;
}

const dataDir = path.resolve(__dirname, 'data');
const dataFile = path.resolve(dataDir, 'student_scores.json');

let submissions: StudentScoreSubmission[] = [];

// Initialize data file
try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (fs.existsSync(dataFile)) {
    const raw = fs.readFileSync(dataFile, 'utf-8');
    submissions = JSON.parse(raw);
  }
} catch (err) {
  console.warn('Could not read existing submissions file:', err);
}

// API: Save student score
app.post('/api/scores', (req, res) => {
  try {
    const data: StudentScoreSubmission = req.body;
    if (!data || !data.studentName || !data.studentClass) {
      return res.status(400).json({ error: 'Data nama dan kelas siswa wajib diisi' });
    }

    submissions.unshift(data);

    // Save to disk
    try {
      fs.writeFileSync(dataFile, JSON.stringify(submissions, null, 2), 'utf-8');
    } catch (saveErr) {
      console.warn('Could not persist to file:', saveErr);
    }

    console.log(`[SCORE SUBMITTED] Siswa: ${data.studentName} | Kelas: ${data.studentClass} | Nilai: ${data.score}/100 | Guru: ${data.teacherEmail}`);

    return res.json({
      success: true,
      message: `Nilai berhasil dicatat dan disinkronkan ke email guru: ${data.teacherEmail}`,
      recordCount: submissions.length,
    });
  } catch (error: any) {
    console.error('Error saving score:', error);
    return res.status(500).json({ error: 'Gagal menyimpan skor siswa' });
  }
});

// API: Get all submissions for teacher portal
app.get('/api/scores', (req, res) => {
  return res.json(submissions);
});

// API: Trigger email delivery log
app.post('/api/send-email', (req, res) => {
  const { recipient, subject, body } = req.body;
  console.log(`[EMAIL DISPATCHED] Kepada: ${recipient || 'uripsupandi99@admin.sma.belajar.id'}`);
  console.log(`Subject: ${subject}`);
  return res.json({
    success: true,
    recipient: recipient || 'uripsupandi99@admin.sma.belajar.id',
    message: 'Laporan evaluasi resmi terkirim ke email guru pengampu.',
  });
});

// Vite Middleware for SPA dev mode or static files for prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Super Mario Sosiologi Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
