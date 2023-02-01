import express from "express"
import { PizzaPlace } from "../../../models/index.js"
import PizzaPlaceSerializer from "../../../serializers/PizzaPlaceSerializer.js"

const pizzaPlaceRouter = new express.Router()

pizzaPlaceRouter.get("/", async (req, res) => {
    try {
        const pizzaPlaces = await PizzaPlace.query()
        const serializedPizzaPlaces = PizzaPlaceSerializer.getSummary(pizzaPlaces)
        res.status(200).json({pizzaPlaces: serializedPizzaPlaces})
    } catch(error) {
        res.status(500).json({ errors: error})
    }
})

pizzaPlaceRouter.get("/:id", async (req, res) => {
    const pizzaId = req.params.id
    try {
        const pizzaPlace = await PizzaPlace.query().findById(pizzaId)
        const serializedPizzaPlace = PizzaPlaceSerializer.getDetail(pizzaPlace)
        return res.status(200).json({pizzaPlace: serializedPizzaPlace})
    } catch(error) {
        return res.status(500).json({errors: error})
    }
})

export default pizzaPlaceRouter