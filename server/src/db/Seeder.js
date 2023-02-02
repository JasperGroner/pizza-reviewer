/* eslint-disable no-console */
import { connection } from "../boot.js"
import PizzaPlaceSeeder from "./seeders/PizzaPlaceSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    await PizzaPlaceSeeder.seed()
    await UserSeeder.seed()
    await ReviewSeeder.seed()
    

    console.log("Done!")
    await connection.destroy()

  }


}

export default Seeder