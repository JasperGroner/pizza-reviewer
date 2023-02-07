import Serializer from "./Serializer.js";

class ReviewSerialzer extends Serializer {
  static async getDetail(review) {
    const serializeReview = this.serialize(review, ["id", "title", "rating", "text", "pizzaId", "userId"])
    const user = await review.$relatedQuery("user")
    serializeReview.firstName = user.firstName
    serializeReview.lastName = user.lastName
    return serializeReview
  }
}

export default ReviewSerialzer