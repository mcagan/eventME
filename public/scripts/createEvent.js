//Generates random string for uniqueURL
const generateUniqueURL = (num) => {
  let result = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < num; i++) {
    result += chars.charAt(Math.floor(Math.random() * 62));
  }
  return result;
};
module.exports = { generateUniqueURL };

const addUser = function (data) {
  const queryText =
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;";
  const values = [data.name, data.email];
  return pool
    .query(queryText, values)
    .then((res) => res.rows)
    .catch((err) => console.log("Err", err));
};
exports.addUser = addUser;

const addEvent = function (data, user) {
  const queryText =
    "INSERT INTO events (title, URL, description, location, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
  const URL = generateUniqueURL(10);
  const values = [data.title, URL, data.description, data.location, user.id];
  return pool
    .query(queryText, values)
    .then((res) => res.rows)
    .catch((err) => console.log("Err", err));
};
exports.addEvent = addEvent;
