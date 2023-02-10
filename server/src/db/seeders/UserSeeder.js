import { User  } from "../../models/index.js";

class UserSeeder {
    static async seed() {
        const userData = [
            {
                firstName: "Tommy",
                lastName: "Jane", 
                email: "tommyjane@gmail.com",
                cryptedPassword: "12345"
            },
            {
                firstName: "Ann",
                lastName: "Jane", 
                email: "annjane@gmail.com",
                cryptedPassword: "124445"
            },
            {
                firstName: "Marry",
                lastName: "Jane", 
                email: "marryjane@gmail.com",
                cryptedPassword: "188845"
            }
        ]
        for (const userSeed of userData) {
            const currentUser = await User.query().findOne({email: userSeed.email})
            if(!currentUser){
                await User.query().insert(userSeed)
            }
        }
    }
}

export default UserSeeder