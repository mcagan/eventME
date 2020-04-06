-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) CASCADE ON DELETE,
  events_id INTEGER REFERENCES events(id) CASCADE ON DELETE,
  comment TEXT NOT NULL,
  posted_on TIMESTAMP
);
