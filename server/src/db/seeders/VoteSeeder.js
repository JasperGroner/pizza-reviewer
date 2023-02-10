import { User, Review, Vote } from '../../models/index.js'

class VoteSeeder {
  static async seed() {
    const user1 = await User.query().findOne({email:"tommyjane@gmail.com" })
    const user2 = await User.query().findOne({email:"annjane@gmail.com" })
    const user3 = await User.query().findOne({email:"marryjane@gmail.com" })

    const review1 = await Review.query().findOne({title: "Best pizza ever have!"})
    const review2 = await Review.query().findOne({title: "Best pizza!"})
    const review3 = await Review.query().findOne({title: "Best pizza ever have. It make my day!"})

    const votingData = [
      {
        vote: 1,
        userId: user1.id,
        reviewId: review1.id,
      },
      {
        vote: 1,
        userId: user2.id,
        reviewId: review1.id,
      },
      {
        vote: 1,
        userId: user3.id,
        reviewId: review1.id,
      },
      {
        vote: -1,
        userId: user1.id,
        reviewId: review2.id,
      },
      {
        vote: -1,
        userId: user2.id,
        reviewId: review2.id,
      },
      {
        vote: 1,
        userId: user1.id,
        reviewId: review3.id,
      }
    ]

    for (const vote of votingData) {
      await Vote.query().insert(vote)
    }
  }
}

export default VoteSeeder