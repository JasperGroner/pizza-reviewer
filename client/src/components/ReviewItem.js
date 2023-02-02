import React from 'react'

const ReviewListItem = ({ title, rating, text }) => {

  return (
    <>
        <h6>Title: {title}</h6>
        <p>Rating: {rating}</p>
        <p>User Review: {text}</p>
    </>
  )
}

export default ReviewListItem