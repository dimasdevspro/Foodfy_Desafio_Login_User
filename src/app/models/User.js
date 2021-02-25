const db = require('../../config/db')
const { hash } = require('bcryptjs')
const RecipeFile = require('../models/RecipeFile')
const Recipe = require('../models/Recipe')
const File = require('../models/File')
const fs = require('fs')

module.exports = {
async findOne(filters){
        try{
             
        let query = "SELECT users.* FROM users"
        
        Object.keys(filters).map(key => {
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })
      
        let results = await db.query(query)
       
        return results.rows[0]  
        }catch(err){
            console.error(err)
        }
       
    },
async create(data) {
        try {
            const query = `
            INSERT INTO users (
                name,
                email,
                password,
                is_admin
            ) VALUES ( $1, $2, $3, $4)
            RETURNING id
        `
        
        // hash of password
        const passwordHash = await hash(data.password, 8)
        
        if (data.is_admin === 'on') {
            data.is_admin = 'true'
        } else {
            data.is_admin = 'false'
        }

        const values = [
            data.name,
            data.email,
            passwordHash,
            data.is_admin
        ]
        
        const results = await db.query(query, values)
        return results.rows[0].id
        
        }catch(err){
            console.error(err)
        }
    
},
async findAll(filters){
    try{
         
    let query = "SELECT users.* FROM users"
    
    Object.keys(filters).map(key => {
        query = `${query}
        ${key}
        `

        Object.keys(filters[key]).map(field => {
            query = `${query} ${field} = '${filters[key][field]}'`
        })
    })
  
    let results = await db.query(query)
   
    return results.rows  
    }catch(err){
        console.error(err)
    }
   
},
async update(id, fields) {
    let query = "UPDATE users SET"

    Object.keys(fields).map((key, index, array) => {
        if (index + 1 < array.length){
            query = `${query}
            ${key} = '${fields[key]}',
            `
        } else {
            //last iteration
            query = `${query}
            ${key} = '${fields[key]}'
                WHERE id = ${id}
            `
        }
    })

return db.query(query)
}, 
async delete(id) {
    const userId = req.body;

    await RecipeFile.delete(recipeId.files_id);
    await File.delete(recipeId.files_id);
    await Recipe.delete(recipeId.recipe_id);

    //pegar todos os produtos
    let results = await db.query("SELECT * FROM recipes WHERE user_id = $1", [id])
    const recipes = results.rows


    // depois produtos, pegar todas as imagens
    const allFilesPromise = products.map(product => 
        Recipes.files(recipe.id))

        let promiseResults = await Promise.all(allFilesPromise)

        //rodar a remoçção do usuário
    await db.query('DELETE FROM users WHERE id = $1', [id])


    // remover as imagens da pasta public
        promiseResults.map(results => {
            results.rows.map(file => {
                try {
                fs.unlinkSync(file.path)
                }catch(err){
                    console.error(err)
                }
            }
                )
        })
}
}

