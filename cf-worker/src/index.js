import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { neon } from '@neondatabase/serverless';
import { SignJWT, jwtVerify } from 'jose';

const app = new Hono();

// ── Helpers ────────────────────────────────────────────────────────────────

const _dec = (b64) => atob(b64);

// SHA-256 bằng Web Crypto API (không cần Node.js crypto)
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// JWT helpers dùng jose
async function signJwt(payload, secret, expiresIn = '12h') {
  const secretKey = new TextEncoder().encode(secret);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

async function verifyJwt(token, secret) {
  const secretKey = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
}

// Auth middleware
const authMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return c.json({ message: 'Chưa đăng nhập' }, 401);
  try {
    const decoded = await verifyJwt(token, c.env.JWT_SECRET);
    c.set('admin', decoded);
    await next();
  } catch {
    return c.json({ message: 'Token hết hạn hoặc không hợp lệ' }, 401);
  }
};

// Lấy SQL client từ env
const getDb = (env) => neon(env.PUBLIC_NEON_URL);

// ── CORS ───────────────────────────────────────────────────────────────────
app.use('*', cors({ origin: '*' }));

// ── 1. LOGIN ───────────────────────────────────────────────────────────────
app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L3gtYXV0aC1zZXNzaW9uLWluaXQ='), async (c) => {
  const { username, password } = await c.req.json();
  const sql = getDb(c.env);
  try {
    const hashedPassword = await sha256(password);
    const rows = await sql`SELECT * FROM admins WHERE username = ${username} AND password = ${hashedPassword}`;
    if (rows.length === 0) return c.json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' }, 401);
    const token = await signJwt({ username }, c.env.JWT_SECRET, '12h');
    return c.json({ success: true, token });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ── 2. PROJECTS CRUD ───────────────────────────────────────────────────────
app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDE='), async (c) => {
  const sql = getDb(c.env);
  const isPublic = c.req.query('public');
  try {
    let rows;
    if (isPublic === 'true') {
      rows = await sql`SELECT * FROM projects WHERE is_visible = true ORDER BY sort_order ASC, created_at DESC`;
    } else {
      rows = await sql`SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC`;
    }
    return c.json(rows);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDE='), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  const { title, description, image, tags, live_demo, source_code, is_visible, title_en, description_en, start_date, end_date } = await c.req.json();
  try {
    const rows = await sql`
      INSERT INTO projects (title, description, image, tags, live_demo, source_code, is_visible, title_en, description_en, start_date, end_date)
      VALUES (${title}, ${description}, ${image}, ${tags}, ${live_demo}, ${source_code}, ${is_visible ?? true}, ${title_en}, ${description_en}, ${start_date}, ${end_date})
      RETURNING *`;
    return c.json(rows[0]);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.put(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDEvOmlk'), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  const id = c.req.param('id');
  const { title, description, image, tags, live_demo, source_code, is_visible, title_en, description_en, start_date, end_date } = await c.req.json();
  try {
    const rows = await sql`
      UPDATE projects SET title=${title}, description=${description}, image=${image}, tags=${tags},
        live_demo=${live_demo}, source_code=${source_code}, is_visible=${is_visible},
        title_en=${title_en}, description_en=${description_en}, start_date=${start_date}, end_date=${end_date}
      WHERE id=${id} RETURNING *`;
    return c.json(rows[0]);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.delete(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDEvOmlk'), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  const id = c.req.param('id');
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// PATCH: Reorder projects
app.patch(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2QtcGF5bG9hZC1oYXNoLXA5MDEvcmVvcmRlcg=='), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  const { order } = await c.req.json();
  if (!Array.isArray(order)) return c.json({ error: 'order phải là một mảng' }, 400);
  try {
    await Promise.all(order.map(({ id, sort_order }) =>
      sql`UPDATE projects SET sort_order=${sort_order} WHERE id=${id}`
    ));
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ── 3. MESSAGES CRUD ───────────────────────────────────────────────────────

// Telegram helpers
async function sendTelegramMsg(env, data) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;
  const { name, email, message } = data;
  const text = `<b>📩 Tin nhắn liên hệ mới</b>\n\n👤 <b>Tên:</b> ${name || 'N/A'}\n📧 <b>Email:</b> ${email || 'N/A'}\n\n💬 <b>Nội dung:</b>\n${message || ''}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    const d = await res.json();
    return d.ok ? d.result.message_id : null;
  } catch { return null; }
}

async function deleteTelegramMsg(env, messageId) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId || !messageId) return;
  await fetch(`https://api.telegram.org/bot${token}/deleteMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, message_id: Number(messageId) }),
  });
}

app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L21zZy1jaGFubmVsLXNlY3VyZS14Mzk='), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  try {
    const rows = await sql`SELECT * FROM messages ORDER BY created_at DESC`;
    return c.json(rows);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L21zZy1jaGFubmVsLXNlY3VyZS14Mzk='), async (c) => {
  const sql = getDb(c.env);
  const body = await c.req.json();
  const { name, email, message } = body;
  try {
    const telegramMessageId = await sendTelegramMsg(c.env, body);
    const rows = await sql`
      INSERT INTO messages (name, email, message, telegram_message_id)
      VALUES (${name}, ${email}, ${message}, ${telegramMessageId}) RETURNING *`;
    return c.json(rows[0]);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.delete(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L21zZy1jaGFubmVsLXNlY3VyZS14MzkvOmlk'), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  const id = c.req.param('id');
  try {
    const rows = await sql`SELECT telegram_message_id FROM messages WHERE id = ${id}`;
    if (rows.length > 0 && rows[0].telegram_message_id) {
      await deleteTelegramMsg(c.env, rows[0].telegram_message_id);
    }
    await sql`DELETE FROM messages WHERE id = ${id}`;
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ── 4. CV SETTINGS ─────────────────────────────────────────────────────────

app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L3N5cy1zdGF0ZS12ZWN0b3ItczE1'), async (c) => {
  const sql = getDb(c.env);
  try {
    const rows = await sql`SELECT value FROM settings WHERE key = 'cv_download_enabled'`;
    const enabled = rows.length ? rows[0].value === 'true' : true;
    return c.json({ enabled });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L3N5cy1zdGF0ZS12ZWN0b3ItczE1L2NvbmZpZw=='), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  const { enabled } = await c.req.json();
  try {
    await sql`INSERT INTO settings (key, value) VALUES ('cv_download_enabled', ${String(enabled)}) ON CONFLICT (key) DO UPDATE SET value = ${String(enabled)}`;
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDI='), async (c) => {
  const sql = getDb(c.env);
  try {
    const enabledRows = await sql`SELECT value FROM settings WHERE key = 'cv_download_enabled'`;
    const enabled = enabledRows.length ? enabledRows[0].value === 'true' : true;
    if (!enabled) return c.json({ error: 'Tính năng tải CV hiện đang bị tắt.' }, 403);
    const linkRows = await sql`SELECT value FROM settings WHERE key = 'cv_link'`;
    const link = linkRows.length ? linkRows[0].value : '#';
    return c.json({ link, enabled: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.get(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDIvYWRtaW4='), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  try {
    const rows = await sql`SELECT value FROM settings WHERE key = 'cv_link'`;
    const link = rows.length ? rows[0].value : '#';
    return c.json({ link });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.post(_dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDI='), authMiddleware, async (c) => {
  const sql = getDb(c.env);
  const { link } = await c.req.json();
  try {
    await sql`INSERT INTO settings (key, value) VALUES ('cv_link', ${link}) ON CONFLICT (key) DO UPDATE SET value = ${link}`;
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ── 5. TELEGRAM BOT WEBHOOK ─────────────────────────────────────────────────

app.post('/api/telegram-bot-hook', async (c) => {
  const webhookSecret = c.env.TELEGRAM_WEBHOOK_SECRET;
  if (webhookSecret && c.req.header('x-telegram-bot-api-secret-token') !== webhookSecret) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  const update = await c.req.json();
  const message = update?.message;
  if (!message?.text) return c.json({ ok: true });

  const chatId = String(message.chat?.id);
  const text = message.text.trim().toLowerCase();
  const allowedChatId = c.env.TELEGRAM_CHAT_ID;

  if (allowedChatId && chatId !== String(allowedChatId)) {
    await tgReply(c.env, chatId, '⛔ Bạn không có quyền dùng lệnh này.');
    return c.json({ ok: true });
  }

  const sql = getDb(c.env);

  try {
    const getCvEnabled = async () => {
      const rows = await sql`SELECT value FROM settings WHERE key = 'cv_download_enabled'`;
      return rows.length ? rows[0].value === 'true' : true;
    };
    const setCvEnabled = async (val) => {
      await sql`INSERT INTO settings (key, value) VALUES ('cv_download_enabled', ${String(val)}) ON CONFLICT (key) DO UPDATE SET value = ${String(val)}`;
    };

    if (text === '/ancv' || text.startsWith('/ancv ')) {
      const enabled = await getCvEnabled();
      if (!enabled) {
        await tgReply(c.env, chatId, 'ℹ️ <b>CV đang ở trạng thái: ĐÃ ẨN</b>\n\nCV hiện đã bị ẩn rồi, không cần ẩn thêm.\nDùng /hiencv để kích hoạt lại.');
      } else {
        await setCvEnabled(false);
        await tgReply(c.env, chatId, '🚫 <b>Đã ẨN CV thành công!</b>\n\nNút tải CV trên trang web đã bị tắt.\nDùng /hiencv để hiện lại.');
      }
    } else if (text === '/hiencv' || text.startsWith('/hiencv ')) {
      const enabled = await getCvEnabled();
      if (enabled) {
        await tgReply(c.env, chatId, 'ℹ️ <b>CV đang ở trạng thái: ĐANG HIỆN</b>\n\nCV hiện đã được bật rồi, không cần bật thêm.\nDùng /ancv để ẩn đi.');
      } else {
        await setCvEnabled(true);
        await tgReply(c.env, chatId, '✅ <b>Đã HIỆN CV thành công!</b>\n\nNút tải CV trên trang web đã được bật lại.\nDùng /ancv để ẩn đi.');
      }
    } else if (text === '/statuscv') {
      const enabled = await getCvEnabled();
      await tgReply(c.env, chatId,
        `📋 <b>Trạng thái CV hiện tại:</b>\n\n${enabled ? '✅ ĐANG HIỆN — Người dùng có thể tải CV.' : '🚫 ĐANG ẨN — Nút tải CV bị tắt.'}\n\nLệnh:\n• /hiencv — Bật hiển thị CV\n• /ancv — Tắt hiển thị CV`
      );
    }
  } catch (err) {
    await tgReply(c.env, chatId, '❌ Có lỗi xảy ra: ' + err.message);
  }

  return c.json({ ok: true });
});

async function tgReply(env, chatId, text) {
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
}

export default app;
