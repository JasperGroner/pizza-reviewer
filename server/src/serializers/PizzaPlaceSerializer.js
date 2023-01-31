import Serializer from "./Serializer.js";

class PizzaPlaceSerializer extends Serializer {
    static getSummary(pizzaPlaces) {
        const serializedPizzaPlaces = pizzaPlaces.map(pizzaPlace => {
           return this.serialize(pizzaPlace, ["id", "name", "imageUrl"])
        })
        return serializedPizzaPlaces
    }
}

export default PizzaPlaceSerializer