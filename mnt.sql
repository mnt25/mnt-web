-- 1. Table: admins
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admins (username, password) VALUES ('admin', 'admin') ON CONFLICT (username) DO NOTHING;

-- 2. Table: projects
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

-- 3. Table: messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table: settings
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT
);

-- Default Settings
INSERT INTO settings (key, value) VALUES ('cv_download_enabled', 'true') ON CONFLICT (key) DO NOTHING;
INSERT INTO settings (key, value) VALUES ('cv_link', '#') ON CONFLICT (key) DO NOTHING;
