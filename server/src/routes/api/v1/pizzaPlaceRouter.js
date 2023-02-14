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
	body.userId = req.user.id
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
	let userId = null
	if (req.user) {
		userId = req.user.id
	}
	try {
		const pizzaPlace = await PizzaPlace.query().findById(pizzaId)
		const serializedPizzaPlace = await PizzaPlaceSerializer.getDetail(pizzaPlace, userId)
		return res.status(200).json({pizzaPlace: serializedPizzaPlace})
	} catch(error) {
		return res.status(500).json({errors: error})
	}
})

pizzaPlaceRouter.delete("/:id", async (req, res) => {
	try {
		await PizzaPlace.query().deleteById(req.params.id)
    return res.status(204).json({message: 'deletion success'})
	} catch(error) {
		return res.status(500).json({errors: error})
	}
})

pizzaPlaceRouter.patch('/:id', async (req, res) => {
	const body = req.body
	body.id = req.params.id
	const formInput = cleanUserInput(body)
	try {
		const editedPizzaPlace = await PizzaPlace.query().patchAndFetchById(formInput.id, {
			name: formInput.name,
			address: formInput.address,
			phoneNumber: formInput.phoneNumber,
			website: formInput.website,
			hours: formInput.hours,
			imageUrl: formInput.imageUrl
		})
		return res.status(200).json({editedPizzaPlace: editedPizzaPlace})
	} catch(error) {
		console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

pizzaPlaceRouter.use("/:pizzaId/reviews/", pizzaPlaceReviewRouter)

export default pizzaPlaceRouter