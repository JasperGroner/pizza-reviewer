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
}

module.exports = PizzaPlace