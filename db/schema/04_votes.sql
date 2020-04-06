DROP TABLE IF EXISTS votes;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  date_id INTEGER REFERENCES dates(id) ON DELETE CASCADE,
  yes_no BOOLEAN
);
