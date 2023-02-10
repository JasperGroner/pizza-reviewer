import { PizzaPlace, User } from "../../models/index.js"

class PizzaPlaceSeeder {
	static async seed() {

		const user1 = await User.query().findOne({email:"marryjane@gmail.com" })

		const pizzaPlacesData = [
			{ 
				name: "Venice Italian Kitchen",
				address: "252 Massachusetts Ave., Arlington, MA 02474",
				phoneNumber: "781-777-1719",
				website: "https://www.venicepizzaarlington.com/", 
				hours: "M-Sa, 11:00AM-10:00PM, Su, 11:00AM-9:00PM",
				imageUrl: "https://venicepizzaarlington.com/img/logo.png",
				userId: user1.id
			},
			{
				name: "Boulevard Pizza", 
				address: "586 Kelley Boulevard, North Attleborough, MA 02760", 
				phoneNumber: "508-699-4449", 
				website: "https://boulevardpizzana.com/", 
				hours: "M-Sa, 11:00AM-9:30PM",
				imageUrl: "https://boulevardpizzana.com/fts-content/uploads/sites/192/2020/10/BLVD-PIZZA-LOGO.png",
				userId: user1.id
			},
			{
				name: "Brickstone Cafe/Pizzeria",
				address: "309 Broadway, Arlington, MA 02474",
				phoneNumber: "781-777-2551",
				website: "https://www.brickstonearlington.com/", 
				hours: "M-Th, 10:30AM-10:00PM, F-Sa, 10:30AM-11:00PM Su, 12:00PM-9:00PM",
				imageUrl: "https://www.brickstonearlington.com/images/logo.png",
				userId: user1.id
			},
			{
				name: "FLORINA Pizzeria & Paninoteca",
				address: "16 Derne St, Boston, MA 02114",
				phoneNumber: "617-936-4494",
				website: "https://www.florinapizza.com/", 
				hours: "M-F, 11:00AM-8:00PM",
				imageUrl: "https://images.squarespace-cdn.com/content/v1/57c24d5f414fb59d818e42b3/1479099455728-MLN8U1XEEYSR3ALGZMNC/FLORINA+5%2522+WEB+TRANS.png?format=1500w",
				userId: user1.id
			},
			{
				name: "Regina Pizzeria",
				address: "11 1/2 Thacher St, Boston, MA 02113",
				phoneNumber: "617-227-0765",
				website: "http://www.pizzeriaregina.com/", 
				hours: "M-Th, 11:00AM-9:00PM, F-Su 11:00AM-10:00PM",
				imageUrl: "http://www.pizzeriaregina.com/assets/images/regina-logo-250x42.png",
				userId: user1.id
			},
			{
				name:"Umberto Galleria",
				address: "289 Hanover St, Boston, MA",
				phoneNumber: "617-227-5709",
				website: "https://www.facebook.com/people/Umberto-Galleria/100063637116449/", 
				hours: "M-Sa, 11:00AM-3:00PM",
				imageUrl: "https://media.cntraveler.com/photos/5d9515d637c3f70009b85246/16:9/w_2560,c_limit/galleriaumberto-boston-2019.jpg",
				userId: user1.id
			},
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