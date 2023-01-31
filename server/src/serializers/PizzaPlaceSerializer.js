import Serializer from "./Serializer.js";

class PizzaPlaceSerializer extends Serializer {
    static getSummary(pizzaPlace) {
        return this.serialize(pizzaPlace, ["id", "name", "imageUrl"])
    }
}

export default PizzaPlaceSerializer