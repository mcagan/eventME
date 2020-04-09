const getURLfromTitle = function (title) {
  const queryText = "SELECT * FROM events WHERE title = $1;";
  const values = [title];
  return pool
    .query(queryText, values)
    .then((res) => res.rows[0].url)
    .catch((err) => console.log("Err", err));
};
