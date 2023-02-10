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
		const { Review, User } = require("./index.js")

		return {
			reviews: {
				relation: Model.HasManyRelation,
				modelClass: Review,
				join: {
					from: "pizzaPlaces.id",
					to: "reviews.pizzaPlaceId"
				}
			},
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "pizzaPlaces.userId",
					to: "users.id"
				}
			}
		}
	}
}

module.exports = PizzaPlace