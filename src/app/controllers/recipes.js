const Recipe = require("../models/Recipe");
const File = require("../models/File");
const RecipeFile = require("../models/RecipeFile");

module.exports = {
  async home(req, res) {
    // buscando todos os dados concatenados das receitas
    let results = await Recipe.all();

    // criando espaço para gravar os dados do Array
    let arrayRecipes = [];

    // criando um colocador de objetos em um Array e renderizando a página com o objeto

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
  about(req, res) {
    return res.render("about");
  },
  async index(req, res) {
    
    const userAdmin = req.session

    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)
    filter 

    const params = {
      filter,
      page,
      limit, 
      offset,
      callback: function(recipes) {
    
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page,
        }
          for (i = 0; recipes.length > i; i++) {
            recipes[i].path = `${req.protocol}://${req.headers.host}${recipes[i].path.replace("public", "")}`,
            recipes[i].author = recipes[i].name
          }console.log(recipes)
          return res.render("admin/recipes/index", {recipes, pagination, filter, userAdmin})
      }  

      }
     
    await Recipe.search(params)
    
  },
  create(req, res) {

    const userAdmin = req.session

    Recipe.chefsSelectOptions()
      .then(function (results) {
        const chefOptions = results.rows;
        return res.render("admin/recipes/create", { chefOptions, userAdmin });
      })
      .catch(function (err) {
        throw new Error(err);
      });
  },
  async post(req, res) {

    //validando se todos os campos estão preenchidos
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        res.send("Please, fill all fields!");
      }
    }

    //validando se ao menos uma imagem será enviada
    if (req.files.length == 0) res.send("Please, send at least one image");

    //gravando os dados no db, na tabela recipes e alocando id

    let results = await Recipe.create(req.body);
    const recipeId = results.rows[0].id;

    // //gravando os dados no db, na tabela - files, e alocando id

    results = await File.create(req.files[0]);
    const fileId = results.rows[0].id;

    //extraindo id's para acessibilidade do controlador RecipeFile

    const reqIdsRecipeFile = {
      body: {
        recipes_id: Number(recipeId),
        files_id: Number(fileId),
      },
    };
    //gravando os id's no db, tabela - recipes_files

    results = await RecipeFile.create(reqIdsRecipeFile.body);

    //redirecionando para a página da receita
    return res.redirect(`recipes/${recipeId}`);

    
  },
  async show(req, res) {

    const userAdmin = req.session

    //buscando as informações de receitas e chefs
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];

    // validando informação
    if (!recipe) return res.send("Recipe Not Found!");

    //buscando as informações das imagens
    results = await File.find(recipe.id);

    //validando se há imagens em arquivo
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
  },
  async edit(req, res) {

    const userAdmin = req.session

    //buscando as informações concatenadas de receitas e chefs
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];

    // validando se há receitas
    if (!recipe) res.send("Recipes not found!");

    //buscando lista de chefs para concatenar com chef do recipe em edição
    results = await Recipe.chefsSelectOptions();
    const chefOptions = results.rows;

    //buscando os dados da imagens
    results = await File.find(recipe.id);

    //validando se há imagens em arquivo
    if (results.rows[0]) {
      const dataFile = results.rows.map((files) => ({
        ...files,
        src: `${req.protocol}://${req.headers.host}${files.path.replace(
          "public",
          ""
        )}`,
      }));
      // console.log(dataFile);
      //renderizando a página e enviando os objetos para edição
      return res.render(`admin/recipes/edit`, {
        recipe,
        dataFile,
        chefOptions,
        userAdmin
      });
    } else {
      const dataFile = {};
      //renderizando a página e enviando os objetos para edição
      return res.render(`admin/recipes/edit`, {
        recipe,
        dataFile,
        chefOptions,
        userAdmin
      });
    }
  },
  async put(req, res) {
    // validando se todos os campos foram preenchidos

    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        return res.send("Please, fill all fields and send at least one image!");
      }
    }

    // se remover imagens, registrar remoção e deletar arquivo do public/images
    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files[0].split(",");
      const lastIndexFiles = removedFiles.length - 1;
      removedFiles.splice(lastIndexFiles, 1);

      await RecipeFile.delete(removedFiles[0]);
      await File.delete(removedFiles[0]);
    }

    // se adicionar mais imagens, registrar os arquivos
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

    // atualizando o bd dos recipes

    await Recipe.update(req.body);

    // redirecionando para show, para verificar mudanças
    const recipeUpdatedId = req.body.id;

    return res.redirect(`/recipes/${recipeUpdatedId}`);
  },
  async delete(req, res) {
    const recipeId = req.body;

    await RecipeFile.delete(recipeId.files_id);
    await File.delete(recipeId.files_id);
    await Recipe.delete(recipeId.recipe_id);

    res.redirect(`/recipes`);
  },
};
