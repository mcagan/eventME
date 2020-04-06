-- figure it out how to add cascade after
DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  location VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
