import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import EditReviewForm from './EditReviewForm'

const ReviewItem = ({ title, rating, text, id, userId, firstName, lastName, voteCount, currentUser, deleteReview, pizzaPlace, setPizzaPlace }) => {
  const [editForm, setEditForm] = useState(null)

  const pizzaId = useParams().id

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

  const voteOnReview = async (vote) => {
    try {
      const response = await fetch(`/api/v1/pizza-places/${pizzaId}/reviews/${id}/votes/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({vote: vote})
      })
      if (!response.ok) { 
        if (response.status === 422){
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`)
        }
      } else {
        const body = await response.json()
        const newVoteCount = body.newVoteCount
        const editedReviews = pizzaPlace.reviews
        const updateID = editedReviews.findIndex(element => element.id === id)
        editedReviews[updateID].voteCount = newVoteCount 
        setPizzaPlace({
          ...pizzaPlace,
          reviews: editedReviews
        })
      }
    } catch(error) {
			console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleUpvoteClick = event => {
    event.preventDefault()
    voteOnReview(1)
  }

  const handleDownvoteClick = event => {
    event.preventDefault()
    voteOnReview(-1)
  }

  let deleteButton = ""
  if (currentUser && currentUser.id === userId) {
    deleteButton = <input className='button' type='button' value='Delete' onClick={handleDeleteClick}/>
  }

  let upvoteButton, downvoteButton
  if (currentUser) {
    upvoteButton = <input className='button' type='button' value='Upvote' onClick={handleUpvoteClick}/>
    downvoteButton = <input className='button' type='button' value='Downvote' onClick={handleDownvoteClick}/>
  }

  return (
    <div>
        {upvoteButton}
        {downvoteButton}
        <p>Vote count: {voteCount}</p>
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