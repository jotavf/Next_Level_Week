const express = require("express")
const server = express()

// importar o banco de dados como sempre

const db = require("./database/db")

// como configurar pasta pública
server.use(express.static("public"))

// habilitar uso do req.body :D
server.use(express.urlencoded({ extended: true }))

//template engine ( tornar o html inteligente )
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true // enquanto desenvolvendo
})

// req e res em tempo de exec.

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
   
    //req.query: Query Strings da url
    // req.query
    // console.log(req.query)
   // --------------------------
    // inserir dados no db

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            itens
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens
    ]
    
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!") 
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved:true })
    }
    db.run(query, values, afterInsertData)
})

// pegar os dados do db

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //campo de pesquisa vazio
        return res.render("search-result.html", {total: 0})
    }
    //pegar os campos do banco de dados
    // LIKE pegará cidades que contenham a palavra pesquisada, não somente a cidade específica
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length
        
        // mostrar resultados pesquisa
        return res.render("search-result.html", {places: rows, total})
    })

})

server.listen(3000)