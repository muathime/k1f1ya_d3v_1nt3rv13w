CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  date_of_birth DATE,
  id_number TEXT,
  phone_number TEXT,
  isKYCCompleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type TEXT NOT NULL CHECK (type IN ('Cash In', 'Cash Out')),
  amount NUMERIC(10, 2),
  metadata JSONB
);