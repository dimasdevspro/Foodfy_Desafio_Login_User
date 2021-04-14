const Recipe = require("../models/Recipe");
module.exports = {
  async indexRecipes(req, res) {
    try {
      let { filter, page, limit } = req.query;
      filter;
      page = page || 1;
      limit = limit || 6;
      let offset = limit * (page - 1);
      if (!filter) return res.redirect("/recipes");
      const params = {
        filter,
        page,
        limit,
        offset,
        callback: function (recipes) {
          const pagination = {
            total: Math.ceil(recipes[0].total / limit),
            page,
          };
          for (i = 0; recipes.length > i; i++) {
            (recipes[i].path = `${req.protocol}://${req.headers.host}${recipes[
              i
            ].path.replace("public", "")}`),
              (recipes[i].author = recipes[i].name);
          }
        
          return res.render("admin/recipes/index", {
            recipes,
            pagination,
            filter,
          });
        },
      };
      await Recipe.search(params);
    } catch (err) {
      console.error(err);
    }
  },
};
