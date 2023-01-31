import { PizzaPlace } from "../../models/index.js"

class PizzaPlaceSeeder {
    static async seed() {
        const pizzaPlacesData = [
            {name: "Venice Italian Kitchen", address: "252 Massachusetts Ave., Arlington, MA 02474", phoneNumber: "781-777-1719", website: "https://www.venicepizzaarlington.com/", hours: "M-Sa, 11:00AM-10:00PM, Su, 11:00AM-9:00PM"},
            {name: "Boulevard Pizza", address: "586 Kelley Boulevard, North Attleborough, MA 02760", phoneNumber: "508-699-4449", website: "https://boulevardpizzana.com/", hours: "M-Sa, 11:00AM-9:30PM"}
        ]
        for (const pizzaPlaceSeed of pizzaPlacesData) {
            const currentPlace = await PizzaPlace.query().findOne({name: pizzaPlaceSeed.name})
            if (!currentPlace) {
                await PizzaPlace.query().insert(pizzaPlaceSeed)
            }
        }
    }
}

export default PizzaPlaceSeeder