/* eslint-disable no-console */
import { connection } from "../boot.js"
import PizzaPlaceSeeder from "./seeders/PizzaPlaceSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import VoteSeeder from "./seeders/VoteSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    await UserSeeder.seed()
    await PizzaPlaceSeeder.seed()
    await ReviewSeeder.seed()
    await VoteSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder