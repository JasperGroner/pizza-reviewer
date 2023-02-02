import { Review , PizzaPlace, User } from "../../models/index.js"


class ReviewSeeder {
    static async seed(){
        const venice = await PizzaPlace.query().findOne({ name:"Venice Italian Kitchen", address: "252 Massachusetts Ave., Arlington, MA 02474"})

        const boulevard = await PizzaPlace.query().findOne({ name:"Boulevard Pizza", address: "586 Kelley Boulevard, North Attleborough, MA 02760"})

        const user1 = await User.query().findOne({email:"tommyjane@gmail.com" })
        const user2 = await User.query().findOne({email:"annjane@gmail.com" })
        const user3 = await User.query().findOne({email:"marryjane@gmail.com" })
        
        const reviewsData = [
            {
                pizzaPlaceId: venice.id,
                userId: user1.id,
                // firstName: user1.firstName,
                // lastName: user1.lastName,
                rating: "3",
                title: "Best pizza ever have!",
                text: "At the round corner of Perfect Square"
            },
            {   
                pizzaPlaceId: venice.id,
                userId: user2.id,
                // firstName: user2.firstName,
                // lastName: user2.lastName,
                pizzaPlaceId: boulevard.id,
                rating: "2",
                title: "Best pizza!",
                text: "New way to start your meal!"
            },
            {   
                pizzaPlaceId: venice.id,
                userId: user3.id,
                // firstName: user3.firstName,
                // lastName: user3.lastName,
                pizzaPlaceId: venice.id,
                rating: "4",
                title: "Best pizza ever have. It make my day!",
                text: "Good place and value for every cent"
            }
        ]
        for (const review of reviewsData){
            const currentReview = await Review
            .query().findOne({ title: review.title })
            if(!currentReview){
                await Review.query().insert(review)
            }
        }
    }
}
export default ReviewSeeder