import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
    try {
        console.log("Checking database connection...");
        const client = await pool.connect();
        console.log("Connected successfully.");
        client.release();

        // 1. Admins Table
        console.log("Checking 'admins' table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        // Seed Admin User
        const adminCheck = await pool.query("SELECT * FROM admins WHERE username = 'admin'");
        if (adminCheck.rows.length === 0) {
            console.log("Seeding default admin user (admin/admin)...");
            await pool.query("INSERT INTO admins (username, password) VALUES ('admin', 'admin')");
        } else {
            console.log("Admin user already exists.");
        }

        // 2. Projects Table
        console.log("Checking 'projects' table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image TEXT,
                tags TEXT[],
                live_demo VARCHAR(255),
                source_code VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 3. Settings Table
        console.log("Checking 'settings' table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(255) PRIMARY KEY,
                value TEXT
            );
        `);

        // Seed CV Settings
        await pool.query("INSERT INTO settings (key, value) VALUES ('cv_download_enabled', 'true') ON CONFLICT (key) DO NOTHING");

        // 4. Messages Table
        console.log("Checking 'messages' table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("\n✅ Database setup complete!");
    } catch (err) {
        console.error("❌ Database setup failed:", err);
    } finally {
        await pool.end();
    }
}

setupDatabase();
