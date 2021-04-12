const db = require('../../config/db');

module.exports = {
  createId(data){
    try {
      const query = `
        INSERT INTO recipes_files (
          recipes_id,
          files_id
        ) VALUES($1, $2)
        RETURNING id`;

      const values = [
        data.recipes_id,
        data.files_id
      ];

      return db.query(query, values);

    } catch (error) {
      throw new Error(error)
    }
  },
  all() {
    try {
      return db.query(`
        SELECT files.*, recipes_files.recipes_id AS recipe_id
        FROM recipes_files
        LEFT JOIN files ON (recipes_files.files_id = files.id)
        GROUP BY files.id, recipes_files.recipes_id
        ORDER BY files.id
      `)
    } catch (err) {
      throw new Error(err);
    }
  },
  findByRecipeId(id){
    try {
      return db.query(`
        SELECT *
        FROM recipes_files
        WHERE recipes_files.recipes_id = $1
        ORDER BY recipes_files.files_id`,
        [id]
      );
    } catch (error) {
      throw new Error(error);
    }
  },
  find(id){
    return db.query(`
    SELECT recipes_files.*, recipes_files.id AS recipes_files_id
    FROM recipes_files
          WHERE recipes_files.recipes_id = $1
          ORDER BY recipes_id`,
      [id]
    );
  },
  findByFileId(id){
    try {
      return db.query(`
        SELECT * 
        FROM recipes_files
        WHERE recipes_files.file_id = $1
        ORDER BY recipes_files.file_id`,
        [id]
      );
    } catch (error) {
      throw new Error(error);
    }
  },
  delete(id){  
    return db.query(`DELETE FROM recipes_files WHERE files_id = $1`, [id]);    
}
}