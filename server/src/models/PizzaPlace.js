const Model = require("./Model.js")

class PizzaPlace extends Model {
	static get tableName() {
		return "pizzaPlaces"
	}

	static get jsonSchema() {
		return {
			type: "object",
			required: ["name", "address", "phoneNumber"],
			properties: {
				name: {type: "string"},
				address: {type: "string"},
				phoneNumber: {type: "string"},
				website: {type: "string"},
				hours: {type: "string"},
				imageUrl: {type: "string"}
			}
		}
	}

	static get relationMappings() {
		const { Review } = require("./index.js")

		return {
			reviews: {
				relation: Model.HasManyRelation,
				modelClass: Review,
				join: {
					from: "pizzaPlaces.id",
					to: "reviews.pizzaPlaceId"
				}
			}
		}
	}
}

module.exports = PizzaPlace