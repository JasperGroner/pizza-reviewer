import Serializer from "./Serializer.js";

class PizzaPlaceSerializer extends Serializer {
	static getSummary(pizzaPlaces) {
		const serializedPizzaPlaces = pizzaPlaces.map(pizzaPlace => {
		   return this.serialize(pizzaPlace, ["id", "name", "imageUrl"])
		})
		return serializedPizzaPlaces
	}

	static async getDetail(pizzaPlace) {
		try {
			const serializedData = this.serialize(pizzaPlace, ["id", "name", "address", "phoneNumber", "website", "hours", "imageUrl"])
			const reviews = await pizzaPlace.$relatedQuery("reviews")
			const serializeReview = reviews.map(review => {
				return this.serialize(review, ["id", "title", "rating", "text", "pizzaId", "userId"])
			})
			serializedData.reviews = serializeReview
			return serializedData
		} catch(error){
			throw(error)
		}
	}	
}

export default PizzaPlaceSerializer