const express = require('express')
const { MongoClient, ObjectId } = require("mongodb");

const app = express()
const port = 3000

const mongoURL = "mongodb+srv://admin:tuloCFaJ279iturp@cluster0.pc09j.mongodb.net/";
const dbName = "ocena_bancodados_18_01_2022_darwin";

async function main() {
    const client = await MongoClient.connect(mongoURL);
    
    const db = client.db(dbName);

    const collection = db.collection("herois")

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.get("/herois", async function (req, res) {
    
        const documentos = await collection.find().toArray();
        res.send(documentos)
    });

    app.get("/herois/:id", async function (req, res) {
        const id = req.params.id;
    
        const item = await collection.findOned({_id: new ObjectId(id)});
    
        res.send(item)
    });

    app.post("/herois", async function (req, res) {
        const item = req.body;

       await collection.insertOne(item)

        res.send("item adicionado com sucesso.")
    });

    app.put("/herois/:id", async function (req, res) {
        const id = req.params.id;
    
        const item = req.body;
       
       await collection.updateOne(
           { _id: new ObjectId(id) },
           
           {
                $set: item,
           }
        );
    
        res.send("Item atualizado com sucesso!")
    });

    app.delete("/herois/:id", async function (req, res) {
        const id = req.params.id;
    
        const isFound = await collection.countDocuments({ _id: new ObjectId(id) });

        await collection.deleteOne({ _id: new ObjectId(id) })
    
        res.send("Item deletado com sucesso!")
    });


    app.listen(port, () => {
        console.log(`Iniciando na porta http://localhost:${port}`);
    });
}

main();