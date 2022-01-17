
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const listaNomeHerois = ["Mulher Maravilha", "Capitã Marvel", "Homen de Ferro"];

app.get("/herois", function (req, res) {
    res.send(listaNomeHerois)
})

app.listen(port, () => {
  console.log(`Iniciando na porta http://localhost:${port}`);
});