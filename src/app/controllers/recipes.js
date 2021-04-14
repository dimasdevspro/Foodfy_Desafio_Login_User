const Recipe = require("../models/Recipe");
const File = require("../models/File");
const RecipeFile = require("../models/RecipeFile");
module.exports = {
  async home(req, res) {
    let results = await Recipe.queryAllRecipes();
    let arrayRecipes = [];
    const dataRecipe = {
      creatorData: function (data) {
        let dataRecipes = {};
        for (i = 0; data.length > i; i++) {
          dataRecipes = {
            filename: data[i].filename,
            src: `${req.protocol}://${req.headers.host}${data[i].path.replace(
              "public",
              ""
            )}`,
            title: data[i].title,
            author: data[i].name,
          };
          arrayRecipes.push(dataRecipes);
        }
        res.render("home", { arrayRecipes });
      },
    };
    dataRecipe.creatorData(results.rows);
  },
  aboutSite(req, res) {
    return res.render("about");
  },
  async indexRecipesHome(req, res) {
    try{
    const userAdmin = req.session;
    let { filter, page, limit } = req.query;
    page = page || 1;
    limit = limit || 6;
    let offset = limit * (page - 1);
    filter;
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
          userAdmin,
        });
      },
    };
    await Recipe.search(params);  
    }catch(err){
      console.error(err)
    } 
  },
  createRecipe(req, res) {
    try{
    const userAdmin = req.session;
    Recipe.chefsSelectOptions()
      .then(function (results) {
        const chefOptions = results.rows;
        return res.render("admin/recipes/create", { chefOptions, userAdmin });
      })
      .catch(function (err) {
        throw new Error(err);
      });  
    }catch (err) {
      console.error(errr)
    }    
  },
  async postNewRecipe(req, res) {
    try{
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        res.send("Please, fill all fields!");
      }
    }
    if (req.files.length == 0) res.send("Please, send at least one image");
    let results = await Recipe.create(req.body);
    const recipeId = results.rows[0].id;
    results = await File.create(req.files[0]);
    const fileId = results.rows[0].id;
    const reqIdsRecipeFile = {
      body: {
        recipes_id: Number(recipeId),
        files_id: Number(fileId),
      },
    };
    results = await RecipeFile.create(reqIdsRecipeFile.body);
    return res.redirect(`recipes/${recipeId}`);  
    }catch (err) {
      console.error(err)
    }  
  },
  async showRecipe(req, res) {
    try {
    const userAdmin = req.session;
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];
    if (!recipe) return res.send("Recipe Not Found!");
    results = await File.find(recipe.id);
    if (results.rows) {
      const dataFile = results.rows.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`,
      }));
      return res.render("admin/recipes/show", { recipe, dataFile, userAdmin });
    } else {
      const dataFile = {};
      return res.render("admin/recipes/show", { recipe, dataFile, userAdmin });
    }  
    } catch (err) {
      console.error(err)
    }    
  },
  async editRecipe(req, res) {
    try {
    const userAdmin = req.session;
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];
    if (!recipe) res.send("Recipes not found!");
    results = await Recipe.chefsSelectOptions();
    const chefOptions = results.rows;
    results = await File.find(recipe.id);
    if (results.rows[0]) {
      const dataFile = results.rows.map((files) => ({
        ...files,
        src: `${req.protocol}://${req.headers.host}${files.path.replace(
          "public",
          ""
        )}`,
      }));
      return res.render(`admin/recipes/edit`, {
        recipe,
        dataFile,
        chefOptions,
        userAdmin,
      });
    } else {
      const dataFile = {};
      return res.render(`admin/recipes/edit`, {
        recipe,
        dataFile,
        chefOptions,
        userAdmin,
      });
    }  
    } catch (err) {
      console.error(err)
    }
    
  },
  async putRecipe(req, res) {
    try {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        return res.send("Please, fill all fields and send at least one image!");
      }
    }
    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files[0].split(",");
      const lastIndexFiles = removedFiles.length - 1;
      removedFiles.splice(lastIndexFiles, 1);
      await RecipeFile.delete(removedFiles[0]);
      await File.delete(removedFiles[0]);
    }
    if (req.files.length != 0) {
      const recipeId = req.body.id;
      let results = await File.create(req.files[0]);
      const fileId = results.rows[0];
      const reqIdsRecipeFile = {
        body: {
          recipes_id: recipeId,
          files_id: fileId.id,
        },
      };
      await RecipeFile.createId(reqIdsRecipeFile.body);
    }
    await Recipe.update(req.body);
    const recipeUpdatedId = req.body.id;
    return res.redirect(`/recipes/${recipeUpdatedId}`);  
    } catch (err) {
      console.error(err)
    }
    
  },
  async deleteRecipe(req, res) {
    try {
    const recipeId = req.body;
    await RecipeFile.delete(recipeId.files_id);
    await File.delete(recipeId.files_id);
    await Recipe.delete(recipeId.recipe_id);
    res.redirect(`/recipes`);  
    } catch (err) {
      console.error(err)
    }
    
  },
};
