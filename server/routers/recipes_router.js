const express = require("express")
const router = express.Router()
const Recipe = require("../models/Recipe")

// Create a GET route to fetch all recipes [/recipe]
router.get('/recipe', async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.json(recipes)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Create a POST route to add a recipe to our Collection [/recipe]
router.post('/recipe', async (req, res) => {
    try {
        const { name, description, ingredients, steps, difficulty } = req.body

        const newRecipe = new Recipe({
            name,
            description,
            ingredients,
            steps,
            difficulty,
        })

        const savedRecipe = await newRecipe.save()
        res.status(200).json(savedRecipe)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Create a GET route with param of id to find and send content to the client app [/recipe/:id]
router.get('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id)

        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' })
        }

        res.json(recipe)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Create a PUT route with param of id to find and edit documents on the front end [/recipe/:id]
router.put('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, ingredients, steps, difficulty } = req.body

        if (!name || !description || !ingredients || !steps || !difficulty) {
            return res.status(400).send({ message: 'Missing required fields' })
        }

        const updatedRecipe = await Recipe.updateOne(
            { _id: id },
            { $set: { name, description, ingredients, steps, difficulty } }
        )

        if (updatedRecipe.matchedCount === 0) {
            return res.status(404).send({ message: 'Recipe not found' })
        }

        res.json(updatedRecipe)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Create a DELETE route with param of id to find and delete the selected document [/recipe/:id]
router.delete('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await Recipe.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Recipe not found' })
        }

        res.status(200).send({ message: 'Deleted successfully' })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
