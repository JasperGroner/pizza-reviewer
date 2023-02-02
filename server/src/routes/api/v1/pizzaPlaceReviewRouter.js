import express from "express"
import { ValidationError } from "objection"

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const pizzaPlaceReviewRouter = new express.Router({ mergeParams: true })

pizzaPlaceReviewRouter.post("/", async (req, res) => {
  const body = req.body
  body.pizzaPlaceId = req.params.id
  const formInput = cleanUserInput(body)
  try {
    const newPizzaReview = await Review.query().insertAndFetch(formInput)
    return res.status(201).json({newPizzaReview})
  } catch(error) {
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default pizzaPlaceReviewRouter