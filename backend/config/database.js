const Database = require('better-sqlite3');
const path = require('path');
const DB_PATH = path.join(__dirname, '../../data/tejidos.db');
const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');
module.exports = db;
