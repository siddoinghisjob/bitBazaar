const pool = require("./pool");

const search = async (data) => {
  try {
    const q = data.id;

    let ads = await pool.query(
      "select id, title, created_at from ads where title ILIKE $1 or description ILIKE $1 ORDER by created_at DESC",
      ['%'+q+'%']
    );
    const adsPromise = ads.rows.map(async (row) => {
      try {
        const query = await pool.query("select * from images where aid = $1", [row.id]);
        const images =
          query.rowCount > 0
            ? query.rows[0].url
            : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
        const obj = { ...row, image: images };
        return obj;
      } catch (error) {
        console.error("Error in processing row:", error);
        return [];
      }
    });

    const message = await Promise.all(adsPromise);
    return message;
  } catch (err) {
    return new Error(err);
  }
};
module.exports = search;
