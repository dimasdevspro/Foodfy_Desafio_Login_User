const db = require('../../config/db')
const { hash } = require('bcryptjs')

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
        } else if (data.is_admin === 'undefined'){
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
    
}
}