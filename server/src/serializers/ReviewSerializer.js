import Serializer from "./Serializer.js";
import VoteSerializer from "./VoteSerializer.js"

class ReviewSerialzer extends Serializer {
  static async getDetail(review) {
    const serializeReview = this.serialize(review, ["id", "title", "rating", "text", "pizzaId", "userId"])
    const user = await review.$relatedQuery("user")
    serializeReview.firstName = user.firstName
    serializeReview.lastName = user.lastName
    serializeReview.image = user.image
    const votes = await review.$relatedQuery("votes")
    serializeReview.voteCount = await VoteSerializer.getSummary(votes)
    return serializeReview
  }
}

export default ReviewSerialzer