const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["pizzaPlaceId", "userId", "rating"],
      properties:  {
        pizzaPlaceId: {type: ["integer", "string"]},
        userId: {type: ["integer", "string"]},
        rating: {type: ["integer", "string"]},
        title: {type: "string"},
        text: {type: "string"}
      }
    }
  }

  static get relationMappings() {
    const { User, PizzaPlace} = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      },
      pizzaPlace: {
        relation: Model.BelongsToOneRelation,
        modelClass: PizzaPlace,
        join: {
          from: "reviews.pizzaPlaceId",
          to: "pizzaPlaces.id"
        }
      }
    }
  }
}

module.exports = Review