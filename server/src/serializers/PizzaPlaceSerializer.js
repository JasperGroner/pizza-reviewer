import Serializer from "./Serializer.js";
import ReviewSerialzer from "./ReviewSerializer.js";

class PizzaPlaceSerializer extends Serializer {
	static getSummary(pizzaPlaces) {
		const serializedPizzaPlaces = pizzaPlaces.map(pizzaPlace => {
		   return this.serialize(pizzaPlace, ["id", "name", "imageUrl"])
		})
		return serializedPizzaPlaces
	}

	static async getDetail(pizzaPlace, userId) {
		try {
			const serializedData = this.serialize(pizzaPlace, ["id", "name", "address", "phoneNumber", "website", "hours", "imageUrl"])
			const reviews = await pizzaPlace.$relatedQuery("reviews")
			const serializedReviews = await Promise.all(
				reviews.map(async (review) => {
					return await ReviewSerialzer.getDetail(review, userId)
				})
			)
			serializedData.reviews = serializedReviews
			return serializedData
		} catch(error){
			throw(error)
		}
	}	
}

export default PizzaPlaceSerializer