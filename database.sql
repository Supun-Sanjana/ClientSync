-- Database (PostgreSQL doesn't support IF NOT EXISTS for CREATE DATABASE in pooled environments)
-- You normally create this manually in Neon dashboard.

-- Switch to database
-- \c clientsync;

-- CLIENT TABLE
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

-- PROJECT TABLE
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',   -- pending, in progress, completed
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
