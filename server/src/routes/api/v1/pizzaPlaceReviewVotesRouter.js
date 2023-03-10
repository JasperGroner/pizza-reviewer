import express from "express";
import { ValidationError } from "objection";

import { Vote, Review } from "../../../models/index.js"
import VoteSerializer from "../../../serializers/VoteSerializer.js";

const pizzaPlaceReviewVotesRouter = new express.Router( {mergeParams: true} )

pizzaPlaceReviewVotesRouter.post("/", async (req, res) => {
  const body = req.body
  body.reviewId = req.params.reviewId
  body.userId = req.user.id
  try {
    const newVote = await Vote.addVote(body)
    const review = await Review.query().findById(body.reviewId)
    const votes = await review.$relatedQuery("votes")
    const serializedVotes = await VoteSerializer.getSummary(votes, body.userId)
    return res.status(201).json({serializedVotes})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default pizzaPlaceReviewVotesRouter