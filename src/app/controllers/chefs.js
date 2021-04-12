const Chef = require("../models/Chef");
const File = require("../models/File");
module.exports = {
  async index(req, res) {
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
      callback: function (chefs) {
        const pagination = {
          total: Math.ceil(chefs[0].total / limit),
          page,
        };
        for (i = 0; chefs.length > i; i++) {
          chefs[i].path = `${req.protocol}://${req.headers.host}${chefs[
            i
          ].path.replace("public", "")}`;
        }
        return res.render("admin/chefs/index", {
          chefs,
          pagination,
          filter,
          userAdmin,
        });
      },
    };
    await Chef.paginate(params);
  },
  async create(req, res) {
    const userAdmin = req.session;
    return res.render("admin/chefs/create", { userAdmin });
  },
  async post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        res.send("Please, fill all fields!");
      }
    }
    if (req.files.length == 0) res.send("Please, send at least one image!");
    const dataFilesChef = {
      filename: req.files[0].filename,
      path: req.files[0].path,
    };
    let results = await File.create(dataFilesChef);
    const dataChef = {
      name: req.body.name,
      file_id: results.rows[0].id,
    };
    results = await Chef.create({ ...dataChef });
    const chefId = results.rows[0].id;
    return res.redirect(`/chefs/${chefId}`);
  },
  async show(req, res) {
    const userAdmin = req.session;
    let results = await Chef.find(req.params.id);
    const chef = results.rows[0];
    if (!chef) return res.send("Chef Not Found!");
    results = await Chef.findRecipes(req.params.id);
    const recipe = results.rows[0];
    results = await File.find2(chef.id);
    if (results.rows) {
      const dataFile = results.rows.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`,
      }));
      return res.render("admin/chefs/show", {
        chef,
        recipe,
        dataFile,
        userAdmin,
      });
    } else {
      const dataFile = {};
      return res.render("admin/recipes/show", {
        chef,
        recipe,
        dataFile,
        userAdmin,
      });
    }
  },
  async edit(req, res) {
    const userAdmin = req.session;
    let results = await Chef.find(req.params.id);
    const chef = results.rows[0];
    if (!chef) res.send("Chefs not found!");
    results = await File.find3(chef.file_id);
    if (results.rows[0]) {
      const dataFile = results.rows.map((files) => ({
        ...files,
        src: `${req.protocol}://${req.headers.host}${files.path.replace(
          "public",
          ""
        )}`,
      }));
      return res.render(`admin/chefs/edit`, {
        chef,
        dataFile,
        userAdmin,
      });
    } else {
      const dataFile = {};
      return res.render(`admin/chefs/edit`, {
        chef,
        dataFile,
        userAdmin,
      });
    }
  },
  async put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        res.send("Please, fill all fields!");
      }
    }
    if (req.body.removed_files != "") {
      const removedFiles = req.body.removed_files[0].split(",");
      const lastIndexFiles = removedFiles.length - 1;
      removedFiles.splice(lastIndexFiles, 1);
      await File.delete(removedFiles[0]);
    }
    if (req.files.length != 0) {
      const dataFilesChef = {
        filename: req.files[0].filename,
        path: req.files[0].path,
      };
      let results = await File.create(dataFilesChef);
      const dataChef = {
        ...req.body,
        file_id: results.rows[0].id,
      };
      results = await Chef.update({ ...dataChef });
      return res.redirect(`/chefs/${req.body.id}`);
    } else {
      const dataChef = {
        ...req.body,
      };
      results = await Chef.update({ ...dataChef });
      return res.redirect(`/chefs/${req.body.id}`);
    }
  },
  async delete(req, res) {
    await Chef.delete(req.body.id);
    await File.delete(req.body.file_id);
    return res.redirect("/chefs");
  },
};
