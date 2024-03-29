const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all() {
    try {
      return db.query(`SELECT *
      FROM chefs t1
      FULL OUTER JOIN files t2
      ON t1.file_id = t2.id
      WHERE file_id IS NOT NULL
      ORDER BY t1.name`);
    } catch (err) {
      console.error(err)
    }
  },
  create(data) {
    try {
    const query = `
        INSERT INTO chefs (
            name,
            file_id,
            created_at
        ) VALUES ( $1, $2, $3)
        RETURNING id
    `;
    const values = [data.name, data.file_id, date(Date.now()).iso];

    return db.query(query, values); 
    } catch (err) {
      console.error(err)
    }   
  },
  find(id) {
    try {
      return db.query(
      `
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`,
      [id]
    );
    } catch (err) {
      console.error(err)
    }  
  },
  findBy(filter, callback) {
    try {
    db.query(
      `
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.name ILIKE '%${filter}%'
        GROUP BY chefs.id
        ORDER BY total_recipes ASC`,
      function (err, results) {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows);
      }
    );  
    } catch (err) {
      console.error(err)
    }
  },
  findRecipes(id) {
    try {
     return db.query(
      `
        SELECT recipes.*, chefs.name AS author
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        `,
      [id]
    );  
    } catch (err) {
      console.error(err)
    }
  },
  update(data) {
    try {
    const query = `
        UPDATE chefs SET
        name=($1),
        file_id=($2)
    WHERE id= $3
        `;
    const values = [data.name, data.file_id, data.id];

    return db.query(query, values, function (err) {
      if (err) throw `Database error ${err}`;
    });  
    } catch (err) {
      console.error(err)
    }
  },
  delete(id) {
    try {
    return db.query(`DELETE FROM chefs WHERE id = $1`, [id], function (err) {
      if (err) throw `Database Error! ${err}`;
    });  
    } catch (err) {
      console.error(err)
    }
  },
  chefsSelectOptions(callback) {
    try {
    db.query(`SELECT name, id FROM chefs`, function (err, results) {
      if (err) throw "Database Error!";

      callback(results.rows);
    });  
    } catch (err) {
      console.error(err)
    }
  },
  paginate(params) {
    try {
    const { filter, limit, offset, callback } = params;

    let query = "",
      filterQuery = "",
      totalQuery = `(
            SELECT count(*) FROM chefs
        ) AS total`;
    if (filter) {
      filterQuery = `
            WHERE chefs.name ILIKE '%${filter}%'
            `;
      totalQuery = `(
                SELECT count(*) FROM chefs
                ${filterQuery}
            ) AS total`;
    }
    query = `
        SELECT chefs.id AS chef_id, chefs.name, chefs.created_at, chefs.file_id AS chefs_file_id,
        files.id AS file_id, files.filename, files.path, ${totalQuery} 
        FROM chefs
        LEFT JOIN files ON (chefs.file_id = files.id)
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `;
    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
    });  
    } catch (err) {
      console.error(err)
    }  
  },
};
