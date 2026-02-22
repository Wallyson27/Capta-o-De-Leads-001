import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Initialize storage file if it doesn't exist
async function initStorage() {
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2));
  }
}

async function startServer() {
  await initStorage();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/leads', async (req, res) => {
    try {
      const data = await fs.readFile(LEADS_FILE, 'utf-8');
      const leads = JSON.parse(data);
      const newLead = { ...req.body, id: Date.now(), created_at: new Date().toISOString() };
      leads.push(newLead);
      await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save lead' });
    }
  });

  // Serve static index.html
  app.use(express.static(__dirname));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
