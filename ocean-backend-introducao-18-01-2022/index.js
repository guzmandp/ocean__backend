const express = require('express')
const { MongoClient, ObjectId } = require("mongodb");

const app = express()
const port = 3000

const mongoURL = "mongodb+srv://admin:hd2rV5duoPrrli3t@cluster0.jup2c.mongodb.net/";
const dbName = "ocena_bancodados_18_12_2022";


async function main() {

    //cluster0.4uek1.mongodb.net


    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    const listaNomeHerois = ["Mulher Maravilha", "Capitã Marvel", "Homen de Ferro"];

    app.get("/herois", function (req, res) {
    
        res.send(listaNomeHerois)
    });

    app.get("/herois/:id", function (req, res) {
        const id = req.params.id - 1;
    
        const item = listaNomeHerois[id]
    
        res.send(item)
    });

    app.post("/herois", function (req, res) {
        const item = req.body.nome;

        listaNomeHerois.push(item);

        res.send("item adicionado com sucesso.")
    });

    app.put("/herois/:id", function (req, res) {
        const id = req.params.id - 1;
    
        const item = req.body;

        listaNomeHerois[id] = item.nome;
    
        res.send("Item atualizado com sucesso!")
    });

    app.delete("/herois/:id", function (req, res) {
        const id = req.params.id - 1;
    
        delete listaNomeHerois[id]
    
        res.send("Item deletado com sucesso!")
    });


    app.listen(port, () => {
        console.log(`Iniciando na porta http://localhost:${port}`);
    });
}

main();