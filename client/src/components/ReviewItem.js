import React, { useState } from 'react'
import EditReviewForm from './EditReviewForm'

const ReviewListItem = ({ title, rating, text, id, userId, firstName, lastName, currentUser }) => {
  const [ review, setReview ] = useState({
    title: title,
    rating: rating,
    text: text,
    firstName: firstName,
    lastName: lastName
  })

  const [editForm, setEditForm] = useState(null)

  const editClickHandler = event => {
    event.preventDefault()
    if(!editForm) {
      setEditForm(
        <EditReviewForm
          reviewId={id}
          title={title}
          rating={rating}
          text={text}
          setReview={setReview}
          setEditForm={setEditForm}
        />
      )
    } else {
      setEditForm(null)
    }
  }

  let editButton
  if(currentUser &&
    currentUser.id === userId) {
    editButton = <input className="button" type="button" value="Edit" onClick={editClickHandler} />
  }

  return (
    <>
        <h6>Title: {review.title}</h6>
        <p>Review by: {review.firstName} {review.lastName}</p>
        <p>Rating: {review.rating}</p>
        <p>User Review: {review.text}</p>
        {editButton}
        {editForm}
    </>
  )
}

export default ReviewListItem