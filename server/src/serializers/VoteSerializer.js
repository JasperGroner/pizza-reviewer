class VoteSerializer {
  static async getSummary(votes, userId) {
    let voteCount = 0
    let userVote = null
    for (const vote of votes) {
      if (vote.userId === userId) {
        userVote = vote.vote
      }
      voteCount += vote.vote
    }
    const serializedVotes = ({voteCount, userVote})
    return serializedVotes
  }
}

export default VoteSerializer