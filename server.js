import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 5000;

// JWT Secret Key
const SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Middleware kiểm tra JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

    try {
        const decoded = jwt.verify(token, SECRET);
        req.admin = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Token hết hạn hoặc không hợp lệ" });
    }
};

// Kết nối Neon Database
const pool = new Pool({
    connectionString: process.env.PUBLIC_NEON_URL,
});

// --- API ROUTES ---

// 1. Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM admins WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
        }

        const token = jwt.sign({ username }, SECRET, { expiresIn: "12h" });

        res.json({ success: true, token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Projects (CRUD)
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects', authMiddleware, async (req, res) => {
    const { title, description, image, tags, live_demo, source_code } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO projects (title, description, image, tags, live_demo, source_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, image, tags, live_demo, source_code]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/projects/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, image, tags, live_demo, source_code } = req.body;
    try {
        const result = await pool.query(
            'UPDATE projects SET title=$1, description=$2, image=$3, tags=$4, live_demo=$5, source_code=$6 WHERE id=$7 RETURNING *',
            [title, description, image, tags, live_demo, source_code, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Messages
app.get('/api/messages', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', authMiddleware, async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/messages/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Settings (CV Link)
app.get('/api/settings/cv', async (req, res) => {
    try {
        const result = await pool.query("SELECT value FROM settings WHERE key = 'cv_link'");
        res.json({ link: result.rows.length ? result.rows[0].value : '#' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/settings/cv', authMiddleware, async (req, res) => {
    const { link } = req.body;
    try {
        // Upsert (Insert or Update)
        await pool.query("INSERT INTO settings (key, value) VALUES ('cv_link', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [link]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
