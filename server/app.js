

const express = require("express")
const app = express()
const routes = require('./routers/recipes_router')

require("dotenv").config()
const PORT = process.env.PORT || 8001


const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.once("open", () => {
console.log("Connected to MongoDB");
});
db.on("error", (err) => {
console.log("DB Error");
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/", routes)

app.use("", (req, res) => {
    res.status(404).send("Page not found");
    });

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    })