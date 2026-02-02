import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 5000;

// JWT Secret Key
const SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Error Handling
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION:', reason);
});

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
app.post('/api/_mntphatfixbug6677/nexus/login', async (req, res) => {
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
app.get('/api/_mntphatfixbug6677/nexus/projects', async (req, res) => {
    const { public: isPublic } = req.query;
    try {
        let query = 'SELECT * FROM projects';
        const params = [];

        if (isPublic === 'true') {
            query += ' WHERE is_visible = true';
        }

        query += ' ORDER BY created_at DESC';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/_mntphatfixbug6677/nexus/projects', authMiddleware, async (req, res) => {
    const { title, description, image, tags, live_demo, source_code, is_visible } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO projects (title, description, image, tags, live_demo, source_code, is_visible, title_en, description_en) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [title, description, image, tags, live_demo, source_code, is_visible ?? true, req.body.title_en, req.body.description_en]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/_mntphatfixbug6677/nexus/projects/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, image, tags, live_demo, source_code, is_visible } = req.body;
    try {
        const result = await pool.query(
            'UPDATE projects SET title=$1, description=$2, image=$3, tags=$4, live_demo=$5, source_code=$6, is_visible=$7, title_en=$8, description_en=$9 WHERE id=$10 RETURNING *',
            [title, description, image, tags, live_demo, source_code, is_visible, req.body.title_en, req.body.description_en, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/_mntphatfixbug6677/nexus/projects/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Messages
app.get('/api/_mntphatfixbug6677/nexus/messages', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Discord Webhook
const sendDiscordMessage = async (data) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        console.warn("DISCORD_WEBHOOK_URL chưa được thiết lập.");
        return;
    }

    const { name, email, message } = data;

    const embed = {
        title: "📩 Tin nhắn liên hệ mới",
        color: 0x3498db, // Blue
        fields: [
            { name: "Tên", value: name || "N/A", inline: true },
            { name: "Email", value: email || "N/A", inline: true },
            { name: "Nội dung", value: message || "No content" }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "MNT Web" }
    };

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] })
        });
        console.log("Đã gửi thông báo tới Discord.");
    } catch (error) {
        console.error("Không gửi được thông báo Discord:", error);
    }
};

app.post('/api/_mntphatfixbug6677/nexus/messages', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        // Gửi tới Discord
        sendDiscordMessage(req.body);

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/_mntphatfixbug6677/nexus/messages/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Settings (CV Link + Status)
app.get('/api/_mntphatfixbug6677/nexus/account/status', async (req, res) => {
    try {
        const enabledResult = await pool.query("SELECT value FROM account_configs WHERE key = 'cv_download_enabled'");
        const enabled = enabledResult.rows.length ? enabledResult.rows[0].value === 'true' : true;
        res.json({ enabled });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/_mntphatfixbug6677/nexus/admin/account/settings', authMiddleware, async (req, res) => {
    const { enabled } = req.body;
    try {
        const enabledStr = String(enabled);
        await pool.query("INSERT INTO account_configs (key, value) VALUES ('cv_download_enabled', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [enabledStr]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/_mntphatfixbug6677/nexus/settings/cv', async (req, res) => {
    try {
        // Public check: must be enabled to see the link
        const enabledResult = await pool.query("SELECT value FROM account_configs WHERE key = 'cv_download_enabled'");
        const enabled = enabledResult.rows.length ? enabledResult.rows[0].value === 'true' : true;

        if (!enabled) {
            return res.status(403).json({ error: "Tính năng tải CV hiện đang bị tắt." });
        }

        const linkResult = await pool.query("SELECT value FROM settings WHERE key = 'cv_link'");
        const link = linkResult.rows.length ? linkResult.rows[0].value : '#';

        res.json({ link, enabled: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin endpoint: Always allowed regardless of toggle
app.get('/api/_mntphatfixbug6677/nexus/admin/settings/cv', authMiddleware, async (req, res) => {
    try {
        const linkResult = await pool.query("SELECT value FROM settings WHERE key = 'cv_link'");
        const link = linkResult.rows.length ? linkResult.rows[0].value : '#';
        res.json({ link });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/_mntphatfixbug6677/nexus/settings/cv', authMiddleware, async (req, res) => {
    const { link } = req.body;
    try {
        await pool.query("INSERT INTO settings (key, value) VALUES ('cv_link', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [link]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error('ADDRESS IN USE');
        console.log(`Port ${port} is already in use.`);
    } else {
        console.error('SERVER ERROR:', e);
    }
});
