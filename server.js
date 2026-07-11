import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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

// Obfuscation helper (Base64 decode)
const _dec = (b64) => Buffer.from(b64, 'base64').toString('utf-8');

// --- API ROUTES (Obfuscated & Encrypted Telemetry Handlers) ---

// 1. Session Init (Login)
app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L3gtYXV0aC1zZXNzaW9uLWluaXQ='), async (req, res) => {
    const { username, password } = req.body;

    try {
        // Mã hóa mật khẩu đầu vào bằng SHA-256
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const result = await pool.query(
            'SELECT * FROM admins WHERE username = $1 AND password = $2',
            [username, hashedPassword]
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

// 2. Technical Payload Hash (Projects CRUD)
app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDE='), async (req, res) => {
    const { public: isPublic } = req.query;
    try {
        let query = 'SELECT * FROM projects';
        const params = [];

        if (isPublic === 'true') {
            query += ' WHERE is_visible = true';
        }

        query += ' ORDER BY sort_order ASC, created_at DESC';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDE='), authMiddleware, async (req, res) => {
    const { title, description, image, tags, live_demo, source_code, is_visible, start_date, end_date } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO projects (title, description, image, tags, live_demo, source_code, is_visible, title_en, description_en, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [title, description, image, tags, live_demo, source_code, is_visible ?? true, req.body.title_en, req.body.description_en, start_date, end_date]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDEvOmlk'), authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, image, tags, live_demo, source_code, is_visible, start_date, end_date } = req.body;
    try {
        const result = await pool.query(
            'UPDATE projects SET title=$1, description=$2, image=$3, tags=$4, live_demo=$5, source_code=$6, is_visible=$7, title_en=$8, description_en=$9, start_date=$10, end_date=$11 WHERE id=$12 RETURNING *',
            [title, description, image, tags, live_demo, source_code, is_visible, req.body.title_en, req.body.description_en, start_date, end_date, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDEvOmlk'), authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH: Reorder projects
app.patch(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDEvcmVvcmRlcg=='), authMiddleware, async (req, res) => {
    // Expects body: { order: [{ id, sort_order }, ...] }
    const { order } = req.body;
    if (!Array.isArray(order)) {
        return res.status(400).json({ error: 'order phải là một mảng' });
    }
    try {
        const updates = order.map(({ id, sort_order }) =>
            pool.query('UPDATE projects SET sort_order=$1 WHERE id=$2', [sort_order, id])
        );
        await Promise.all(updates);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Message Channel Secure Payload (Messages CRUD)
app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L21zZy1jaGFubmVsLXNlY3VyZS14Mzk='), authMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Telegram Notification
const sendTelegramMessage = async (data) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId || chatId === 'YOUR_TELEGRAM_CHAT_ID') {
        console.warn("TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID chưa được cấu hình chính xác.");
        return null;
    }

    const { name, email, message } = data;
    const text = `<b>📩 Tin nhắn liên hệ mới</b>\n\n` +
                 `👤 <b>Tên:</b> ${name || "N/A"}\n` +
                 `📧 <b>Email:</b> ${email || "N/A"}\n\n` +
                 `💬 <b>Nội dung:</b>\n${message || "No content"}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: "HTML"
            })
        });
        const resData = await response.json();
        if (resData.ok) {
            console.log("Đã gửi thông báo tới Telegram.");
            return resData.result.message_id;
        } else {
            console.error("Lỗi gửi thông báo Telegram:", resData.description);
            return null;
        }
    } catch (error) {
        console.error("Không gửi được thông báo Telegram:", error);
        return null;
    }
};

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L21zZy1jaGFubmVsLXNlY3VyZS14Mzk='), async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Gửi tới Telegram để lấy message_id
        const telegramMessageId = await sendTelegramMessage(req.body);

        const result = await pool.query(
            'INSERT INTO messages (name, email, message, telegram_message_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, message, telegramMessageId]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Telegram Deletion Helper
const deleteTelegramMessage = async (messageId) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId || chatId === 'YOUR_TELEGRAM_CHAT_ID') {
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/deleteMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                message_id: Number(messageId)
            })
        });
        const resData = await response.json();
        if (resData.ok) {
            console.log(`Đã xóa tin nhắn liên quan trên Telegram (ID: ${messageId}).`);
        } else {
            console.warn(`Không thể xóa tin nhắn trên Telegram: ${resData.description}`);
        }
    } catch (error) {
        console.error("Không kết nối được để xóa tin nhắn Telegram:", error);
    }
};

app.delete(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L21zZy1jaGFubmVsLXNlY3VyZS14MzkvOmlk'), authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        // Lấy telegram_message_id trước khi xóa trong DB
        const msgResult = await pool.query('SELECT telegram_message_id FROM messages WHERE id = $1', [id]);
        if (msgResult.rows.length > 0) {
            const telegramMessageId = msgResult.rows[0].telegram_message_id;
            if (telegramMessageId) {
                // Gọi bất đồng bộ xóa tin nhắn trên Telegram
                await deleteTelegramMessage(telegramMessageId);
            }
        }

        await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Encrypted settings (CV download link and security state config vectors)
app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L3N5cy1zdGF0ZS12ZWN0b3ItczE1'), async (req, res) => {
    try {
        const enabledResult = await pool.query("SELECT value FROM settings WHERE key = 'cv_download_enabled'");
        const enabled = enabledResult.rows.length ? enabledResult.rows[0].value === 'true' : true;
        res.json({ enabled });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L3N5cy1zdGF0ZS12ZWN0b3ItczE1L2NvbmZpZw=='), authMiddleware, async (req, res) => {
    const { enabled } = req.body;
    try {
        const enabledStr = String(enabled);
        await pool.query("INSERT INTO settings (key, value) VALUES ('cv_download_enabled', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [enabledStr]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDI='), async (req, res) => {
    try {
        // Public check: must be enabled to see the link
        const enabledResult = await pool.query("SELECT value FROM settings WHERE key = 'cv_download_enabled'");
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
app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDIvYWRtaW4='), authMiddleware, async (req, res) => {
    try {
        const linkResult = await pool.query("SELECT value FROM settings WHERE key = 'cv_link'");
        const link = linkResult.rows.length ? linkResult.rows[0].value : '#';
        res.json({ link });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDI='), authMiddleware, async (req, res) => {
    const { link } = req.body;
    try {
        await pool.query("INSERT INTO settings (key, value) VALUES ('cv_link', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [link]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Telegram Bot Command Handler ───────────────────────────────────────────

// Helper: gửi tin nhắn phản hồi về chat_id cụ thể
const sendTelegramReply = async (chatId, text) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) return;
    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
        });
    } catch (err) {
        console.error('sendTelegramReply error:', err.message);
    }
};

// Helper: lấy trạng thái CV hiện tại từ DB
const getCvEnabled = async () => {
    const result = await pool.query("SELECT value FROM settings WHERE key = 'cv_download_enabled'");
    return result.rows.length ? result.rows[0].value === 'true' : true;
};

// Helper: cập nhật trạng thái CV trong DB
const setCvEnabled = async (enabled) => {
    await pool.query(
        "INSERT INTO settings (key, value) VALUES ('cv_download_enabled', $1) ON CONFLICT (key) DO UPDATE SET value = $1",
        [String(enabled)]
    );
};

// Telegram Webhook Endpoint — nhận lệnh từ Telegram
// Bảo mật bằng secret token trong header X-Telegram-Bot-Api-Secret-Token
app.post('/api/telegram-bot-hook', async (req, res) => {
    // Xác thực webhook secret (tùy chọn nhưng khuyến nghị)
    const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (webhookSecret) {
        const incomingSecret = req.headers['x-telegram-bot-api-secret-token'];
        if (incomingSecret !== webhookSecret) {
            return res.status(403).json({ error: 'Forbidden' });
        }
    }

    // Chỉ xử lý chat từ đúng CHAT_ID đã cấu hình (ngăn người lạ dùng lệnh)
    const allowedChatId = process.env.TELEGRAM_CHAT_ID;
    const update = req.body;
    const message = update?.message;

    if (!message || !message.text) {
        return res.json({ ok: true }); // bỏ qua các update không phải tin nhắn
    }

    const chatId = String(message.chat?.id);
    const text = message.text.trim().toLowerCase();

    // Kiểm tra quyền — chỉ cho phép đúng chat_id đã cấu hình
    if (allowedChatId && chatId !== String(allowedChatId)) {
        await sendTelegramReply(chatId, '⛔ Bạn không có quyền dùng lệnh này.');
        return res.json({ ok: true });
    }

    try {
        if (text === '/ancv' || text.startsWith('/ancv ')) {
            const currentlyEnabled = await getCvEnabled();
            if (!currentlyEnabled) {
                // CV đang ẩn rồi → thông báo trạng thái
                await sendTelegramReply(chatId,
                    `ℹ️ <b>CV đang ở trạng thái: ĐÃ ẨN</b>\n\nCV hiện đã bị ẩn rồi, không cần ẩn thêm.\nDùng /hiencv để kích hoạt lại.`
                );
            } else {
                // CV đang hiện → tắt đi
                await setCvEnabled(false);
                await sendTelegramReply(chatId,
                    `🚫 <b>Đã ẨN CV thành công!</b>\n\nNút tải CV trên trang web đã bị tắt.\nDùng /hiencv để hiện lại.`
                );
            }

        } else if (text === '/hiencv' || text.startsWith('/hiencv ')) {
            const currentlyEnabled = await getCvEnabled();
            if (currentlyEnabled) {
                // CV đang hiện rồi → thông báo trạng thái
                await sendTelegramReply(chatId,
                    `ℹ️ <b>CV đang ở trạng thái: ĐANG HIỆN</b>\n\nCV hiện đã được bật rồi, không cần bật thêm.\nDùng /ancv để ẩn đi.`
                );
            } else {
                // CV đang ẩn → bật lại
                await setCvEnabled(true);
                await sendTelegramReply(chatId,
                    `✅ <b>Đã HIỆN CV thành công!</b>\n\nNút tải CV trên trang web đã được bật lại.\nDùng /ancv để ẩn đi.`
                );
            }

        } else if (text === '/trangthaiCV' || text === '/statuscv') {
            const currentlyEnabled = await getCvEnabled();
            await sendTelegramReply(chatId,
                `📋 <b>Trạng thái CV hiện tại:</b>\n\n${currentlyEnabled ? '✅ ĐANG HIỆN — Người dùng có thể tải CV.' : '🚫 ĐANG ẨN — Nút tải CV bị tắt.'}\n\nLệnh:\n• /hiencv — Bật hiển thị CV\n• /ancv — Tắt hiển thị CV`
            );
        }
        // Lệnh không nhận ra → bỏ qua (không reply tránh spam)

    } catch (err) {
        console.error('Telegram command handler error:', err.message);
        await sendTelegramReply(chatId, '❌ Có lỗi xảy ra khi xử lý lệnh. Thử lại sau.');
    }

    res.json({ ok: true });
});

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Telegram Bot Webhook endpoint: POST /api/telegram-bot-hook`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error('ADDRESS IN USE');
        console.log(`Port ${port} is already in use.`);
    } else {
        console.error('SERVER ERROR:', e);
    }
});
