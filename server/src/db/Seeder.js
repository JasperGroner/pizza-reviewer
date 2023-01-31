/* eslint-disable no-console */
import { connection } from "../boot.js"
import PizzaPlaceSeeder from "./seeders/PizzaPlaceSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    await PizzaPlaceSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder