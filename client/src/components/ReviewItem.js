import React from 'react'

const ReviewListItem = ({ title, rating, text, deleteReview, id }) => {

const handleDeleteClick = event => {
  event.preventDefault()
  deleteReview(id)
}

  return (
    <>
        <h6>Title: {title}</h6>
        <p>Rating: {rating}</p>
        <p>User Review: {text}</p>
        <input className='button' type='button' value='Delete' onClick={handleDeleteClick}/> 
    </>
  )
}

export default ReviewListItem