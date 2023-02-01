import Serializer from "./Serializer.js";

class PizzaPlaceSerializer extends Serializer {
    static getSummary(pizzaPlaces) {
        const serializedPizzaPlaces = pizzaPlaces.map(pizzaPlace => {
           return this.serialize(pizzaPlace, ["id", "name", "imageUrl"])
        })
        return serializedPizzaPlaces
    }

    static getDetail(pizzaPlace) {
        return this.serialize(pizzaPlace, ["id", "name", "address", "phoneNumber", "website", "hours", "imageUrl"])
    }
}

export default PizzaPlaceSerializer