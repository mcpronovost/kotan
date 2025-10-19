const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");
const { app } = require("electron");

class DatabaseService {
  constructor() {
    this.db = null;
    this.dbPath = null;
  }

  initialize() {
    // Create user-specific database directory
    const userDataPath = app.getPath("userData");
    const dbDir = path.join(userDataPath, "database");
    
    // Ensure database directory exists
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    // Create user-specific database file
    this.dbPath = path.join(dbDir, "kotan.db");
    this.db = new Database(this.dbPath);
    
    // Initialize tables
    this.initializeTables();
  }

  initializeTables() {
    // Create villagers table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS villagers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL DEFAULT 'John Doedingerson',
        health INTEGER NOT NULL DEFAULT 100,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create settings table for app configuration
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  // Villager operations
  getAllVillagers() {
    const stmt = this.db.prepare("SELECT * FROM villagers ORDER BY created_at ASC");
    return stmt.all();
  }

  addVillager(name = "John Doedingerson", health = 100) {
    const stmt = this.db.prepare("INSERT INTO villagers (name, health) VALUES (?, ?)");
    const result = stmt.run(name, health);
    return result.lastInsertRowid;
  }

  removeVillager(id) {
    const stmt = this.db.prepare("DELETE FROM villagers WHERE id = ?");
    return stmt.run(id).changes > 0;
  }

  updateVillagerHealth(id, health) {
    const stmt = this.db.prepare("UPDATE villagers SET health = ? WHERE id = ?");
    return stmt.run(health, id).changes > 0;
  }

  // Settings operations
  getSetting(key) {
    const stmt = this.db.prepare("SELECT value FROM settings WHERE key = ?");
    const result = stmt.get(key);
    return result ? result.value : null;
  }

  setSetting(key, value) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO settings (key, value, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(key, value);
  }

  // Cleanup
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

module.exports = DatabaseService;
