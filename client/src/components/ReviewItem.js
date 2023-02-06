import React, { useState } from 'react'
import EditReviewForm from './EditReviewForm'

<<<<<<< HEAD
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
=======
const ReviewListItem = ({ title, rating, text, deleteReview, id, currentUser, userId }) => {

  const handleDeleteClick = event => {
		event.preventDefault()
		deleteReview(id)
  }

  let button = ""
  if (currentUser && currentUser.id === userId) {
    button = <input className='button' type='button' value='Delete' onClick={handleDeleteClick}/>
>>>>>>> 5f4d327c5c20575a9b4eae09cb20e36367812b80
  }

  return (
    <>
<<<<<<< HEAD
        <h6>Title: {review.title}</h6>
        <p>Review by: {review.firstName} {review.lastName}</p>
        <p>Rating: {review.rating}</p>
        <p>User Review: {review.text}</p>
        {editButton}
        {editForm}
=======
      <h6>Title: {title}</h6>
      <p>Rating: {rating}</p>
      <p>User Review: {text}</p>
      {button}
>>>>>>> 5f4d327c5c20575a9b4eae09cb20e36367812b80
    </>
  )
}

export default ReviewListItem