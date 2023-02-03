import React from 'react'

const ReviewListItem = ({ title, rating, text }) => {

  return (
    <div className='review-tile'>
        <h6>Title: {title}</h6>
        <p>Rating: {rating}</p>
        <p>User Review: {text}</p>
    </div>
  )
}

export default ReviewListItem