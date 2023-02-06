import React, { useState } from "react"
import { useParams } from "react-router-dom"
import ErrorList from "./layout/ErrorList"

const NewReviewForm = ({ pizzaPlace, setPizzaPlace }) => {
  const [newReview, setNewReview] = useState({
    rating: 3,
    title: "",
    text: ""
  })

  const [errors, setErrors] = useState({})

  const postNewReview = async(newReviewData) => {
    const pizzaId = useParams().id
    try {
      const response = await fetch(`/api/v1/pizza-places/${pizzaId}/reviews/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newReviewData)
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
        return body.newPizzaReview
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const reviewData = await postNewReview(newReview)
    setPizzaPlace({
      ...pizzaPlace,
      reviews: [...pizzaPlace.reviews, reviewData]
    })
    clearForm()
  }

  const clearForm = () => {
    setNewReview({
      rating: 3,
      title: "",
      text: ""
    })
  }

  return (
    <div>
      <h1>Add New Review</h1>
      <form onSubmit={handleSubmit} >
        <ErrorList errors={errors}/>
        <label htmlFor="rating">
          Rating:
          <input
            type="range"
            min="1" 
            max="5"
            step="1"
            onChange={handleInputChange}
            value={newReview.value}
            id="rating" 
            name="rating"
          />
        </label>
        
        {newReview.rating} stars
        
        <label htmlFor="title">
          Title of Review:
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
            value={newReview.title}
          />
        </label>

        <label htmlFor="text">
          Text of Review:
          <textarea
            name="text"
            id="text"
            onChange={handleInputChange}
            value={newReview.text}
          />
        </label>
        
        <input className='button' type='submit' value='Submit' />
        <input className='button' type='button' value='Clear Form' onClick={clearForm}/> 

      </form>
    </div>
  )
}

export default NewReviewForm