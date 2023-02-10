import Serializer from "./Serializer.js";
import VoteSerializer from "./VoteSerializer.js"

class ReviewSerialzer extends Serializer {
  static async getDetail(review, userId) {
    const serializedReview = this.serialize(review, ["id", "title", "rating", "text", "pizzaId", "userId"])
    const user = await review.$relatedQuery("user")
    serializedReview.firstName = user.firstName
    serializedReview.lastName = user.lastName
    serializedReview.image = user.image
    const votes = await review.$relatedQuery("votes")
    const serializedVotes = await VoteSerializer.getSummary(votes, userId)
    serializedReview.voteCount = serializedVotes.voteCount
    serializedReview.userVote = serializedVotes.userVote
    return serializedReview
  }
}

export default ReviewSerialzer