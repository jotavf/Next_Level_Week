// importar a dependencia sqlite3

const sqlite3 = require("sqlite3").verbose()

// criar objeto que irá operar o DB

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o db

// db.serialize( () => {
//     //CRUD com comandos SQL//
    
//     // Criar uma tabela

//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             itens TEXT
//         );
//     `)

//     // Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             itens
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº: 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]
    
//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
//     db.run(query, values, afterInsertData)

    // Consultar dados da tabela
    
    // function searchData(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // }

    // db.all('SELECT id FROM places', searchData)

    // // Deletar dado da tabela

    // function deleteData(err){
    //     if(err){
    //        return console.log(err)
    //     }
    //     console.log("Deletado com sucesso!")

    // }

    // db.run(`DELETE FROM places WHERE id = ?`, [6], deleteData)

// })