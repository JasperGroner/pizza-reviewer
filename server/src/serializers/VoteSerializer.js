class VoteSerializer {
  static async getSummary(review) {
    const votes = await review.$relatedQuery("votes")
    let voteCount = 0
    for (const vote of votes) {
     voteCount += vote.vote
    }
    return voteCount
  }
}

export default VoteSerializer