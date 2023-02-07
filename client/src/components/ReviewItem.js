import React, { useState } from 'react'
import EditReviewForm from './EditReviewForm'

const ReviewItem = ({ title, rating, text, id, userId, firstName, lastName, currentUser, deleteReview, pizzaPlace, setPizzaPlace }) => {
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
          pizzaPlace={pizzaPlace}
          setPizzaPlace={setPizzaPlace}
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

  const handleDeleteClick = event => {
		event.preventDefault()
		deleteReview(id)
  }

  let deleteButton = ""
  if (currentUser && currentUser.id === userId) {
    deleteButton = <input className='button' type='button' value='Delete' onClick={handleDeleteClick}/>
  }

  return (
    <div className="review-tile">
        <h6>Title: {title}</h6>
        <p>Review by: {firstName} {lastName}</p>
        <p>Rating: {rating}</p>
        <p>User Review: {text}</p>
        {editButton}
        {deleteButton}
        {editForm}
    </div>
  )
}

export default ReviewItem