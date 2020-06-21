const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27018";

//kod JS
//ustawienie, ze moja aplikacja musi korzystac z silnika hbs
app.set("view engine", 'hbs')
//wyrenderowanie strony, gdy uzytkownik wchodzi na stronę
app.get('/', function (req, res) {
    const sample = () => {
        return 'proba'
    }
    res.render('index', {
        pageTitle: "System rezerwacji lotów"
    })
})
//wypisanie na stronie tekstu
app.get('/about', function (req, res) {
    res.render('reservation', {
        pageTitle: "Strona rezerwacji"
    })
})
// Podpięcie css
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, "./assets")));
//podpięcie js
app.use('/js', express.static(path.join(__dirname, "./js")));
//baza dodanie uzytkownika
app.use(bodyparser.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    const dbname = "flight_project";
    mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log("error", err);
        }
        const db = client.db(dbname);
        db.collection("users").insertOne(
            {
                login: req.body.loginValue,
                password: req.body.passValue,
                name: req.body.nameValue,
                surname: req.body.surnameValue,
                email: req.body.emailValue
            },
            (error, result) => {
                if (error) {
                    console.log("error when inserting", error);
                }
                console.log(result);
            }
        );
        console.log("połączenie udane");
    });
    console.log(req.body);
    res.render('index', {
        pageTitle: "System rezerwacji lotów"
    })
});
//server
app.listen(port, (err) => {
    if (err) {
        return console.log("coś poszło nie tak...:", err)
    }
    console.log("serwer działa na porcie", port)
})

