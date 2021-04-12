const db = require("../../config/db");
const fs = require("fs");

module.exports = {
  create(data) {
    const query = `
        INSERT INTO files (
            filename,
            path
        ) VALUES ( $1, $2 )
        RETURNING id
        `;
    const values = [data.filename, data.path];
    console.log(values);
    return db.query(query, values);
  },
  find(id) {
    try {
      return db.query(
        `SELECT files.id AS file_id, files.filename, files.path, recipes_files.id AS recipes_files_id, recipes_files.files_id, recipes_files.recipes_id
            FROM files 
            LEFT JOIN recipes_files ON (recipes_files.files_id = files.id )
            WHERE recipes_files.recipes_id = $1`,
        [id]
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  find2(id) {
    try {
      return db.query(
        `SELECT files.id AS file_id, files.filename, files.path
            FROM files 
            LEFT JOIN chefs ON (chefs.file_id = files.id )
            WHERE chefs.id = $1`,
        [id]
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  find3(id) {
    try {
      return db.query(
        `SELECT files.id AS file_id, files.filename, files.path
            FROM files 
            LEFT JOIN chefs ON (chefs.file_id = files.id )
            WHERE files.id = $1`,
        [id]
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  async delete(id) {
    try {
      const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
      const file = results.rows[0];
      if (file.path) fs.unlinkSync(file.path);
    } catch (err) {
      console.error(err);
    }
    return db.query(
      `
        DELETE FROM files WHERE id = $1
        `,
      [id]
    );
  },
};
