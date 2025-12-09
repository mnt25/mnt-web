import 'dotenv/config';
import { URL } from 'url';

console.log("Environment Keys loaded:");
Object.keys(process.env).forEach(key => {
    // Filter generic system vars to reduce noise, keep custom ones
    if (!key.startsWith('npm_') && !key.startsWith('Program') && !key.startsWith('System')) {
        console.log(key);
    }
});

try {
    const url = process.env.DATABASE_URL;
    if (!url) {
        console.log("DATABASE_URL is NOT set in environment.");
    } else {
        // Parse URL to show host only, hiding credentials
        try {
            // Handle postgres:// connection strings
            const parsed = new URL(url);
            console.log("Database Host:", parsed.hostname);
            console.log("Database Port:", parsed.port);
            console.log("Protocol:", parsed.protocol);
        } catch (e) {
            console.log("DATABASE_URL is set but not a valid URL format (might be connection string?)");
            // Minimal peek
            console.log("First 10 chars:", url.substring(0, 10));
        }
    }
} catch (err) {
    console.error("Error reading env:", err);
}
