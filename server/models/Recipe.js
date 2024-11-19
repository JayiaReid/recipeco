const { default: mongoose } = require("mongoose");

const Recipe = new mongoose.Schema({
    name : {type: String, required: true},
    description:{type: String, required: true},
    difficulty: {type: String, required: true},
    ingredients: [{type: String, required: true}],
    steps: [{type: String, required: true}],
})

module.exports = mongoose.model("recipes", Recipe)