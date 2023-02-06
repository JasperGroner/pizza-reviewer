import Serializer from "./Serializer.js";

class ReviewSerialzer extends Serializer {
  static async getDetail(review) {
    const user = await review.$relatedQuery("user")
    review.firstName = user.firstName
    review.lastName = user.lastName
    return this.serialize(review, ["id", "title", "rating", "text", "pizzaId", "userId", "firstName", "lastName"])
  }
}

export default ReviewSerialzer