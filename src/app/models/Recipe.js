const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  queryAllRecipes() {
    try {
      return db.query(`SELECT * 
       FROM recipes_files t1
       FULL OUTER JOIN files t2
       ON t1.files_id = t2.id 
       FULL OUTER JOIN recipes t3
       ON t1.recipes_id = t3.id
       FULL OUTER JOIN chefs t4
       ON t3.chef_id = t4.id
       WHERE recipes_id IS NOT NULL
       ORDER BY t3.created_at DESC`);
    } catch (err) {
      console.error(err);
    }
  },
  create(data) {
    const keys = Object.keys(data);
    for (key of keys) {
      if (data[key] == "") return res.send("Please, fill all fields");
    }
    const query = `
    INSERT INTO recipes (
        title,
        ingredients,
        preparations,
        informations,
        created_at,
        chef_id
        ) VALUES ( $1, ARRAY[$2], ARRAY[$3], $4, $5, $6)
        RETURNING id
        `;
    const values = [
      data.title,
      `${data.ingredients}`,
      `${data.preparations}`,
      data.informations,
      date(Date.now()).iso,
      data.chef,
    ];
    return db.query(query, values);
  },
  update(data) {
    const query = `
        UPDATE recipes SET
        title=($1),
        ingredients=ARRAY[($2)],
        preparations=ARRAY[($3)],
        informations=($4),
        chef_id=($5)
        WHERE id= $6
        `;
    const values = [
      data.title,
      `${data.ingredients}`,
      `${data.preparations}`,
      data.informations,
      data.chef,
      data.id,
    ];
    return db.query(query, values);
  },
  delete(id) {
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id]);
  },
  find(id) {
    return db.query(
      `
                SELECT recipes.*, chefs.name AS author
                FROM recipes
                LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
                WHERE recipes.id = $1`,
      [id]
    );
  },
  chefsSelectOptions() {
    return db.query(`
            SELECT name, id FROM chefs`);
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params;
    let query = "",
      filterQuery = "",
      totalQuery = `(
                SELECT count(*) FROM recipes
        ) AS total`;
    if (filter) {
      filterQuery = `
      WHERE recipes.title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'
            `;
      totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`;
    }
    query = `
       SELECT *, ${totalQuery}
       FROM recipes_files 
       FULL OUTER JOIN files 
       ON recipes_files.files_id = files.id 
       FULL OUTER JOIN recipes 
       ON recipes_files.recipes_id = recipes.id
       FULL OUTER JOIN chefs 
       ON recipes.chef_id = chefs.id
       ${filterQuery}
       ORDER BY recipes.created_at
       LIMIT $1 OFFSET $2
        `;
    return db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
    });
  },
  files(id) {
    return db.query(
      `
        SELECT * FROM files WHERE id = $1
        `,
      [id]
    );
  },
  filesAll() {
    return db.query(`
        SELECT * FROM files 
        ORDER BY id ASC
        `);
  },
  search(params) {
    const { filter, limit, offset, callback } = params;
    let query = "",
      filterQuery = "WHERE recipes.title = recipes.title",
      totalQuery = `(
            SELECT count(*) FROM recipes
        ) AS total`;
    if (filter) {
      filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'
            `;
      totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`;
    }
    query = `
        SELECT *, ${totalQuery}
        FROM recipes_files 
        FULL OUTER JOIN files 
        ON recipes_files.files_id = files.id 
        FULL OUTER JOIN recipes 
        ON recipes_files.recipes_id = recipes.id
        FULL OUTER JOIN chefs 
        ON recipes.chef_id = chefs.id
        ${filterQuery}
        ORDER BY recipes.updated_at DESC
        LIMIT $1 OFFSET $2
        `;
    return db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database Error! ${err}`;
      console.log(query);
      callback(results.rows);
    });
  },
};
