import express from "express"
import { PizzaPlace } from "../../../models/index.js"
import PizzaPlaceSerializer from "../../../serializers/PizzaPlaceSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import pizzaPlaceReviewRouter from "./pizzaPlaceReviewRouter.js"
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

pizzaPlaceRouter.post("/", async (req, res) => {
	const { body } = req
	const formInput = cleanUserInput(body)
	try {
		const newPizzaPlace = await PizzaPlace.query().insertAndFetch(formInput)
		return res.status(201).json({ newPizzaPlace })
	} catch(error) {
		if(error instanceof ValidationError) {
			return res.status(422).json({errors: error.data})
		}
		return res.status(500).json({ errors: error })
	}
})

pizzaPlaceRouter.get("/:id", async (req, res) => {
	const pizzaId = req.params.id
	try {
		const pizzaPlace = await PizzaPlace.query().findById(pizzaId)
		const serializedPizzaPlace = await PizzaPlaceSerializer.getDetail(pizzaPlace)
		return res.status(200).json({pizzaPlace: serializedPizzaPlace})
	} catch(error) {
		return res.status(500).json({errors: error})
	}
})

pizzaPlaceRouter.use("/:id/reviews/new", pizzaPlaceReviewRouter)

export default pizzaPlaceRouter