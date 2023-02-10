import React, { useState } from "react";
import { useParams } from "react-router-dom"
import ErrorList from "./layout/ErrorList";
import PizzaImageArray from "./PizzaImageArray";

const EditReviewForm = ({ reviewId, title, text, rating, setShowEditForm, pizzaPlace, setPizzaPlace}) => {
  
  const [editedReview, setEditedReview] = useState({
    rating: rating,
    title: title || "",
    text: text || ""
  })

  const [errors, setErrors] = useState({})

  const pizzaId = useParams().id

  const editReview = async (editedReviewData) => {
    try {
      const response = await fetch(`/api/v1/pizza-places/${pizzaId}/reviews/${reviewId}/`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(editedReviewData)
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
        return body.editedReview
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newlyEditedReview = await editReview(editedReview)
    const editedReviews = pizzaPlace.reviews
    const updateID = editedReviews.findIndex(element => element.id === reviewId)
    editedReviews[updateID] = newlyEditedReview
    setPizzaPlace({
      ...pizzaPlace,
      reviews: editedReviews
    })
    setShowEditForm(false)
  }

  const handleInputChange = event => {
    setEditedReview({
      ...editedReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <>
      <h6>Edit Review</h6>
      <form onSubmit={handleSubmit} className="review-form">
        <ErrorList errors={errors}/>
        <label htmlFor="rating">
          Rating:
          <input
            type="range"
            min="1" 
            max="5"
            step="1"
            onChange={handleInputChange}
            value={editedReview.rating}
            id="rating" 
            name="rating"
          />
        </label>
        
        <PizzaImageArray rating={editedReview.rating}/>
        
        <label htmlFor="title">
          Title of Review:
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
            value={editedReview.title}
          />
        </label>

        <label htmlFor="text">
          Text of Review:
          <textarea
            name="text"
            id="text"
            onChange={handleInputChange}
            value={editedReview.text}
          />
        </label>
        
        <input className='button' type='submit' value='Submit' />

      </form>
    </>
  )
}

export default EditReviewForm