import express from "express";
import { ValidationError } from "objection";

import { Vote } from "../../../models/index.js"

const pizzaPlaceReviewVotesRouter = new express.Router( {mergeParams: true} )

pizzaPlaceReviewVotesRouter.post("/", async (req, res) => {
  const body = req.body
  body.reviewId = req.params.reviewId
  body.userId = req.user.id
  try {
    const newVote = await Vote.addVote(body)
    return res.status(201).json({newVote})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default pizzaPlaceReviewVotesRouter