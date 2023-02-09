import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import EditReviewForm from './EditReviewForm'
import PizzaImageArray from './PizzaImageArray'

const ReviewItem = ({ title, rating, text, id, userId, firstName, lastName, voteCount, currentUser, deleteReview, pizzaPlace, setPizzaPlace, image }) => {

  const [showEditForm, setShowEditForm] = useState(false)

  const pizzaId = useParams().id

  const editClickHandler = event => {
    event.preventDefault()
    setShowEditForm(showEditForm ? false : true)
  }

  let editForm
  if(showEditForm) {
    editForm = <EditReviewForm
      reviewId={id}
      title={title}
      rating={rating}
      text={text}s
      pizzaPlace={pizzaPlace}
      setPizzaPlace={setPizzaPlace}
      setShowEditForm={setShowEditForm}
    />
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
    <div className="review-tile">
        {upvoteButton}
        {downvoteButton}
        <p>Vote count: {voteCount}</p>
        <h6>Title: {title}</h6>
        <p>Review by: {firstName} {lastName} <img className="user-image" src={image} /></p>
        <p>Rating: <PizzaImageArray rating={rating}/></p>
        <p>User Review: {text}</p>
        {editButton}
        {deleteButton}
        {editForm}
    </div>
  )
}

export default ReviewItem