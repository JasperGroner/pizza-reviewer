import { Review, Vote } from "../models/index.js"

const deleteReview = async (reviewId) => {
  const review = await Review.query().findById(reviewId)
  const votes = await review.$relatedQuery("votes")
  for (const vote of votes) {
    await Vote.query().deleteById(vote.id)
  }
  await Review.query().deleteById(reviewId)
  return true
}

export default deleteReview